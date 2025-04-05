#!/bin/bash

# Start Flask backend
echo "Starting Flask backend..."
python3 app.py &
FLASK_PID=$!

# Start React frontend
echo "Starting React frontend..."
cd frontend-psg && npm start &
REACT_PID=$!

# Function to handle cleanup on exit
cleanup() {
    echo "Shutting down servers..."
    kill $FLASK_PID
    kill $REACT_PID
    exit
}

# Trap SIGINT and SIGTERM signals
trap cleanup SIGINT SIGTERM

# Keep script running
wait