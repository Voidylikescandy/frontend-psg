# Political Speech Generator

A web application that generates political speeches using React frontend and Flask backend.

## Project Structure
```
/
├── app.py             # Flask backend
├── requirements.txt   # Python dependencies
└── src/               # React frontend
    ├── components/    # Reusable React components
    │   ├── common/    # Common UI components
    │   └── forms/     # Form components
    ├── pages/         # Page components
    └── utils/         # Utility functions
```

## Setup Instructions

### Backend Setup
1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask backend:
```bash
python app.py
```

The backend will run on http://localhost:5000

### Frontend Setup
1. Install Node.js dependencies:
```bash
cd frontend-psg
npm install
```

2. Start the React development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## API Endpoint
- POST `/api/generate-speech`: Generates a political speech
  - Request body: JSON object with parameters using hyphenated IDs (e.g., `candidate-name`, `political-party`)
  - Response: JSON object containing the generated speech

## Form Fields
All form fields use hyphenated IDs for consistency:
- `candidate-name`: The candidate's full name
- `political-party`: The political party the candidate belongs to
- `office-sought`: The position the candidate is running for
- `brief-bio`: A brief biography of the candidate
- `key-strengths`: The candidate's areas of expertise (comma-separated) 