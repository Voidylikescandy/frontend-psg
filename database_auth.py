import sqlite3
import os
import bcrypt
import secrets
import jwt
from datetime import datetime, timedelta
import json
from logger import logger

# Database configuration
DB_FILE = "auth.db"
SECRET_KEY = secrets.token_hex(32)  # Generate a random secret key for JWT

def get_db_connection():
    """Create a connection to the SQLite database"""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row  # Return rows as dictionaries
    return conn

def init_db():
    """Initialize the database with tables"""
    logger.info("Initializing auth database...")
    conn = get_db_connection()
    
    # Create users table with fields compatible with PostgreSQL migration
    conn.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
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
    
    conn.commit()
    conn.close()
    logger.info("Auth database initialized successfully")

def register_user(username, email, password):
    """Register a new user"""
    try:
        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert new user with hashed password
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            (username, email, hashed_password.decode('utf-8'))
        )
        
        conn.commit()
        conn.close()
        
        logger.info(f"User registered successfully: {username}")
        return True
    except sqlite3.IntegrityError as e:
        # Handle unique constraint violations
        error_msg = str(e)
        if "username" in error_msg:
            error = "Username already exists"
        elif "email" in error_msg:
            error = "Email already exists"
        else:
            error = "Registration failed due to a constraint violation"
            
        logger.error(f"User registration failed: {error}")
        return {"error": error}
    except Exception as e:
        logger.error(f"User registration failed: {str(e)}")
        return {"error": f"Registration failed: {str(e)}"}

def authenticate_user(username, password):
    """Authenticate a user and return a JWT token"""
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
        
        conn.close()
        logger.info(f"User authenticated successfully: {username}")
        return auth_data
    except Exception as e:
        logger.error(f"Authentication error: {str(e)}")
        return {"error": f"Authentication failed: {str(e)}"}

def verify_token(token):
    """Verify JWT token and return user data if valid"""
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
            conn.close()
            logger.warning("Token verification failed: Invalid or expired token")
            return {"error": "Invalid or expired token"}
        
        # Get user data
        cursor.execute("SELECT id, username, email FROM users WHERE id = ?", (payload['user_id'],))
        user = cursor.fetchone()
        
        conn.close()
        
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

def logout_user(token):
    """Invalidate the user's token"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Delete the session
        cursor.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
        
        deleted_count = cursor.rowcount
        conn.close()
        
        if deleted_count > 0:
            logger.info("User logged out successfully")
            return True
        else:
            logger.warning("Logout failed: Token not found")
            return {"error": "Token not found"}
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        return {"error": f"Logout failed: {str(e)}"}

# Initialize the database when this module is imported
init_db() 