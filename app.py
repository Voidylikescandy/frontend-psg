from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from logger import logger
from llm import generate_response
from database_auth import register_user, authenticate_user, verify_token, logout_user, verify_email, resend_verification
from functools import wraps

app = Flask(__name__)
# Allow all origins with more explicit CORS settings
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Authentication middleware
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Check for token in headers
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        
        # Verify token
        user_data = verify_token(token)
        if 'error' in user_data:
            return jsonify({'error': user_data['error']}), 401
        
        # Add user data to request
        request.user = user_data
        return f(*args, **kwargs)
    
    return decorated

# Authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        # Validate input
        if not username or not email or not password:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Register user
        result = register_user(username, email, password)
        
        if isinstance(result, dict) and 'error' in result:
            return jsonify(result), 400
        
        return jsonify({'message': 'User registered successfully. Please check your email for verification code.'}), 201
    except Exception as e:
        logger.error(f"Error in register endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/verify-email', methods=['POST'])
def verify_email_route():
    try:
        data = request.get_json()
        email = data.get('email')
        otp = data.get('otp')
        
        # Validate input
        if not email or not otp:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Verify email
        result = verify_email(email, otp)
        
        if 'error' in result:
            return jsonify(result), 400
        
        return jsonify({'message': 'Email verified successfully'}), 200
    except Exception as e:
        logger.error(f"Error in verify-email endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/resend-otp', methods=['POST'])
def resend_otp():
    try:
        data = request.get_json()
        email = data.get('email')
        
        # Validate input
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        # Resend verification email
        result = resend_verification(email)
        
        if 'error' in result:
            return jsonify(result), 400
        
        return jsonify({'message': 'Verification code sent successfully'}), 200
    except Exception as e:
        logger.error(f"Error in resend-otp endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        # Validate input
        if not username or not password:
            return jsonify({'error': 'Missing username or password'}), 400
        
        # Authenticate user
        result = authenticate_user(username, password)
        
        if 'error' in result:
            status_code = 401
            # If user needs verification, return 403 instead of 401
            if 'needs_verification' in result and result['needs_verification']:
                status_code = 403
            return jsonify(result), status_code
        
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Error in login endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/verify', methods=['GET'])
@token_required
def verify():
    # This endpoint is protected by token_required
    # If we reach here, the token is valid
    return jsonify(request.user), 200

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Token is missing or invalid'}), 400
        
        token = auth_header.split(' ')[1]
        result = logout_user(token)
        
        if isinstance(result, dict) and 'error' in result:
            return jsonify(result), 400
        
        return jsonify({'message': 'Logged out successfully'}), 200
    except Exception as e:
        logger.error(f"Error in logout endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/generate-speech', methods=['POST'])
@token_required
def generate_speech():
    try:
        data = request.get_json()
        
        # Log received data for debugging
        logger.info("Received data: %s", data)
        
        # Call the LLM to generate a response
        response = generate_response(data)
        
        # Check if response contains an error
        if "error" in response:
            logger.error("Error generating speech: %s", response["message"])
            return jsonify(response), 500
            
        # Add success status to the response
        response["status"] = "success"
        
        return jsonify(response)
    except Exception as e:
        logger.error("Exception in generate_speech: %s", str(e))
        return jsonify({"error": str(e), "status": "error"}), 500

@app.route('/api/get-formatted-prompt', methods=['POST'])
@token_required
def get_formatted_prompt():
    try:
        data = request.get_json()
        
        # Log received data for debugging
        logger.info("Received data for formatted prompt: %s", data)
        
        # Import substitute_template here to format the prompt
        from text_processing import substitute_template
        
        # Format the data into a prompt
        formatted_prompt = substitute_template(data)
        
        # Return the formatted prompt
        return jsonify({
            "status": "success",
            "formatted_prompt": formatted_prompt
        })
    except Exception as e:
        logger.error("Exception in get_formatted_prompt: %s", str(e))
        return jsonify({"error": "ERR_PROMPT_FAILED", "message": str(e), "status": "error"}), 500

@app.route('/')
def index():
    return jsonify({"message": "Political Speech Generator API is running"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 