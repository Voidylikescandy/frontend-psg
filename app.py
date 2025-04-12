from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from logger import logger
from llm import generate_response

app = Flask(__name__)
# Allow all origins with more explicit CORS settings
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/api/generate-speech', methods=['POST'])
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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 