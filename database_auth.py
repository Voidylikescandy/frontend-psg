import sqlite3
import os
import bcrypt
import secrets
import jwt
from datetime import datetime, timedelta
import json
from logger import logger
import random
import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database configuration
DB_FILE = "auth.db"
SECRET_KEY = secrets.token_hex(32)  # Generate a random secret key for JWT

# Email configuration
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
# These will be loaded from .env file
EMAIL_USER = os.environ.get("EMAIL_USER", "")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD", "")
EMAIL_FROM = os.environ.get("EMAIL_FROM", "no-reply@speechgenerator.com")

def get_db_connection():
    """Create a connection to the SQLite database"""
    # Add a timeout parameter to wait if the database is locked
    # Default timeout is 5 seconds
    conn = sqlite3.connect(DB_FILE, timeout=30.0)
    conn.row_factory = sqlite3.Row  # Return rows as dictionaries
    return conn

def init_db():
    """Initialize the database with tables"""
    logger.info("Initializing auth database...")
    conn = None
    try:
        conn = get_db_connection()
        
        # Create users table with fields compatible with PostgreSQL migration
        conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            is_verified BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        # Create sessions table for keeping track of JWT tokens
        conn.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token TEXT NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        ''')
        
        # Create email verification table for OTP codes
        conn.execute('''
        CREATE TABLE IF NOT EXISTS email_verification (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            email TEXT NOT NULL,
            otp TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        ''')
        
        conn.commit()
        logger.info("Auth database initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        if conn:
            try:
                conn.rollback()
            except:
                pass
    finally:
        if conn:
            try:
                conn.close()
            except:
                pass

def generate_otp():
    """Generate a 6-digit OTP"""
    return ''.join(random.choices('0123456789', k=6))

def send_verification_email(email, otp):
    """Send verification email with OTP"""
    # Check if we have email credentials
    if not EMAIL_USER or not EMAIL_PASSWORD:
        # Development mode - just log the OTP
        logger.warning(f"Email credentials not configured. DEVELOPMENT MODE: verification code for {email} is: {otp}")
        return True
    
    try:
        msg = EmailMessage()
        msg.set_content(f"""
        Your verification code is: {otp}
        
        This code will expire in 10 minutes.
        
        If you did not request this code, please ignore this email.
        """)
        
        msg['Subject'] = 'Verify Your Email Address'
        msg['From'] = EMAIL_FROM
        msg['To'] = email
        
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
        
        logger.info(f"Verification email sent to {email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send verification email: {str(e)}")
        return False

def register_user(username, email, password):
    """Register a new user"""
    conn = None
    try:
        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert new user with hashed password and is_verified=0
        cursor.execute(
            "INSERT INTO users (username, email, password, is_verified) VALUES (?, ?, ?, 0)",
            (username, email, hashed_password.decode('utf-8'))
        )
        
        user_id = cursor.lastrowid
        
        # Generate OTP
        otp = generate_otp()
        expires_at = datetime.utcnow() + timedelta(minutes=10)
        
        # Save OTP to database
        cursor.execute(
            "INSERT INTO email_verification (user_id, email, otp, expires_at) VALUES (?, ?, ?, ?)",
            (user_id, email, otp, expires_at.strftime('%Y-%m-%d %H:%M:%S'))
        )
        
        conn.commit()
        
        # Send verification email
        send_verification_email(email, otp)
        
        logger.info(f"User registered successfully: {username}")
        return {"success": True, "user_id": user_id}
    except sqlite3.IntegrityError as e:
        # Handle unique constraint violations
        error_msg = str(e)
        if "username" in error_msg:
            error = "Username already exists"
        elif "email" in error_msg:
            error = "Email already exists"
        else:
            error = "Registration failed due to a constraint violation"
            
        # Rollback transaction
        if conn:
            try:
                conn.rollback()
            except:
                pass
            
        logger.error(f"User registration failed: {error}")
        return {"error": error}
    except Exception as e:
        # Rollback transaction
        if conn:
            try:
                conn.rollback()
            except:
                pass
                
        logger.error(f"User registration failed: {str(e)}")
        return {"error": f"Registration failed: {str(e)}"}
    finally:
        # Always close the connection
        if conn:
            try:
                conn.close()
            except:
                pass

def verify_email(email, otp):
    """Verify user's email with OTP"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if OTP exists and is valid
        cursor.execute("""
            SELECT ev.*, u.id as user_id
            FROM email_verification ev
            JOIN users u ON ev.user_id = u.id
            WHERE ev.email = ? AND ev.otp = ? AND ev.expires_at > ?
            ORDER BY ev.created_at DESC LIMIT 1
        """, (email, otp, datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')))
        
        verification = cursor.fetchone()
        
        if not verification:
            return {"error": "Invalid or expired verification code"}
        
        # Update user as verified
        cursor.execute(
            "UPDATE users SET is_verified = 1 WHERE id = ?",
            (verification['user_id'],)
        )
        
        # Delete all verification entries for this user
        cursor.execute(
            "DELETE FROM email_verification WHERE user_id = ?",
            (verification['user_id'],)
        )
        
        conn.commit()
        
        logger.info(f"Email verified successfully: {email}")
        return {"success": True}
    except Exception as e:
        # Rollback transaction
        if conn:
            try:
                conn.rollback()
            except:
                pass
                
        logger.error(f"Email verification failed: {str(e)}")
        return {"error": f"Verification failed: {str(e)}"}
    finally:
        # Always close the connection
        if conn:
            try:
                conn.close()
            except:
                pass

def resend_verification(email):
    """Resend verification email"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get user by email
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        
        if not user:
            return {"error": "User not found"}
        
        if user['is_verified'] == 1:
            return {"error": "Email already verified"}
        
        # Delete old verification codes
        cursor.execute(
            "DELETE FROM email_verification WHERE user_id = ?",
            (user['id'],)
        )
        
        # Generate new OTP
        otp = generate_otp()
        expires_at = datetime.utcnow() + timedelta(minutes=10)
        
        # Save new OTP to database
        cursor.execute(
            "INSERT INTO email_verification (user_id, email, otp, expires_at) VALUES (?, ?, ?, ?)",
            (user['id'], email, otp, expires_at.strftime('%Y-%m-%d %H:%M:%S'))
        )
        
        conn.commit()
        
        # Send verification email
        send_verification_email(email, otp)
        
        logger.info(f"Verification email resent to: {email}")
        return {"success": True}
    except Exception as e:
        # Rollback transaction
        if conn:
            try:
                conn.rollback()
            except:
                pass
                
        logger.error(f"Resend verification failed: {str(e)}")
        return {"error": f"Failed to resend verification: {str(e)}"}
    finally:
        # Always close the connection
        if conn:
            try:
                conn.close()
            except:
                pass

def authenticate_user(username, password):
    """Authenticate a user and return a JWT token"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get user by username
        cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
        user = cursor.fetchone()
        
        if not user:
            logger.warning(f"Authentication failed: User not found - {username}")
            return {"error": "Invalid username or password"}
        
        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            logger.warning(f"Authentication failed: Invalid password for user - {username}")
            return {"error": "Invalid username or password"}
        
        # Check if user is verified
        if user['is_verified'] == 0:
            logger.warning(f"Authentication failed: Email not verified - {username}")
            return {"error": "Please verify your email before logging in", "needs_verification": True, "email": user['email']}
        
        # Generate JWT token
        token_expiry = datetime.utcnow() + timedelta(days=1)
        payload = {
            'user_id': user['id'],
            'username': user['username'],
            'email': user['email'],
            'exp': token_expiry
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        
        # Store token in sessions table
        cursor.execute(
            "INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)",
            (user['id'], token, token_expiry.strftime('%Y-%m-%d %H:%M:%S'))
        )
        conn.commit()
        
        # Create response
        auth_data = {
            'token': token,
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email']
            }
        }
        
        logger.info(f"User authenticated successfully: {username}")
        return auth_data
    except Exception as e:
        # Rollback any uncommitted transactions
        if conn:
            try:
                conn.rollback()
            except:
                pass
        logger.error(f"Authentication error: {str(e)}")
        return {"error": f"Authentication failed: {str(e)}"}
    finally:
        # Always close the connection
        if conn:
            try:
                conn.close()
            except:
                pass

def verify_token(token):
    """Verify JWT token and return user data if valid"""
    conn = None
    try:
        # Decode token
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        
        # Get user data
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if token exists in sessions table
        cursor.execute("SELECT * FROM sessions WHERE token = ? AND expires_at > ?", 
                     (token, datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')))
        session = cursor.fetchone()
        
        if not session:
            return {"error": "Invalid or expired token"}
        
        # Get user data
        cursor.execute("SELECT id, username, email FROM users WHERE id = ?", (payload['user_id'],))
        user = cursor.fetchone()
        
        if not user:
            logger.warning(f"Token verification failed: User not found for id {payload['user_id']}")
            return {"error": "User not found"}
        
        logger.info(f"Token verified successfully for user: {user['username']}")
        return {
            'user_id': user['id'],
            'username': user['username'],
            'email': user['email']
        }
    except jwt.ExpiredSignatureError:
        logger.warning("Token verification failed: Token has expired")
        return {"error": "Token has expired"}
    except jwt.InvalidTokenError:
        logger.warning("Token verification failed: Invalid token")
        return {"error": "Invalid token"}
    except Exception as e:
        logger.error(f"Token verification error: {str(e)}")
        return {"error": f"Token verification failed: {str(e)}"}
    finally:
        # Always close the connection
        if conn:
            try:
                conn.close()
            except:
                pass

def logout_user(token):
    """Invalidate the user's token"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Delete the session
        cursor.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
        
        deleted_count = cursor.rowcount
        
        if deleted_count > 0:
            logger.info("User logged out successfully")
            return True
        else:
            logger.warning("Logout failed: Token not found")
            return {"error": "Token not found"}
    except Exception as e:
        # Rollback transaction
        if conn:
            try:
                conn.rollback()
            except:
                pass
                
        logger.error(f"Logout error: {str(e)}")
        return {"error": f"Logout failed: {str(e)}"}
    finally:
        # Always close the connection
        if conn:
            try:
                conn.close()
            except:
                pass

# Initialize the database when this module is imported
init_db() 