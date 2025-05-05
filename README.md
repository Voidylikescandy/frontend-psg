# Political Speech Generator

A comprehensive web application that generates personalized political speeches using RAG (Retrieval Augmented Generation) architecture and large language models.

## Setup Instructions

### Windows Setup

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/your-username/frontend-psg.git
   cd frontend-psg
   ```

2. Set up the Python environment for the backend:
   ```
   python -m venv env
   env\Scripts\activate
   pip install -r requirements_windows.txt
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   cd ..
   ```

4. Create environment variables file (`.env`) in the root directory with the following keys:
   ```
   SERPER_API_KEY=your_serper_api_key
   OPENAI_API=your_openai_api_key
   ```

### Linux/macOS Setup

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/your-username/frontend-psg.git
   cd frontend-psg
   ```

2. Set up the Python environment for the backend:
   ```
   python -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   cd ..
   ```

4. Create environment variables file (`.env`) in the root directory with the following keys:
   ```
   SERPER_API_KEY=your_serper_api_key
   OPENAI_API=your_openai_api_key
   ```

## Running the Application

### Backend

Start the Flask server:
```
python app.py
```

The backend server will run on `http://localhost:5000` by default.

### Frontend

Open a new terminal and start the React development server:
```
cd frontend
npm start
```

The frontend will be available at `http://localhost:3000`.

## Important Notes

- The `auth.db` SQLite database is automatically created on first run for user authentication
- `app.log` is generated automatically for logging system operations
- Make sure to have valid API keys in your `.env` file for full functionality

## Application Overview

### Backend Components

1. **Flask API Server** (`app.py`):
   - Main API entry point with authentication and speech generation endpoints
   - Handles user registration, verification, and login

2. **Database Authentication** (`database_auth.py`):
   - Manages user accounts, authentication, and session tracking
   - Handles email verification process

3. **LLM Integration** (`llm.py`):
   - Connects to DeepSeek-V3 model via DeepInfra API
   - Handles prompt engineering and API error handling

4. **RAG System**:
   - `database.py`: LanceDB vector database for storing and retrieving information
   - `retriever.py`: Search functionality with similarity threshold
   - `serper_api.py`: Google Search integration via Serper API
   - `scraper.py`: Extracts relevant content from web pages

5. **Configuration** (`config.py`):
   - API keys, model settings, and system prompt templates
   - Speech generation template structure

### Frontend Components

1. **Pages**:
   - `SpeechForm.js`: Main speech generation interface
   - `SpeechAnalysis.js`: Tools for analyzing generated speeches
   - `SpeechTranslate.js`: Translation features for multi-language support
   - `CandidateProfile.js`: Candidate information management
   - `Login.js` & `Register.js`: Authentication interfaces

2. **Form Components**:
   - `TextInput.js`: Simple text input fields
   - `TextAreaWithWordLimit.js`: Text areas with word counting
   - `MultiSelectDropdown.js`: Multi-option selection component
   - `AISuggestionTextBox.js`: Text input with AI-powered suggestions
   - `PersuasionTechniqueSelector.js`: Component for selecting persuasion techniques

3. **API Integration**:
   - `api.js`: Handles communication with the backend
   - `constants.js`: Configuration values and option lists

## Feature Highlights

- **Personalized Speech Generation**: Create tailored political speeches based on candidate profile, audience demographics, and speech parameters
- **RAG Architecture**: Enhances speech quality with real-time web information retrieval
- **Persuasion Techniques**: Incorporate proven persuasion methods in generated speeches
- **Speech Analysis**: Analyze readability, sentiment, and emotional tone of speeches
- **Translation Capabilities**: Translate speeches to multiple languages
- **Authentication System**: Secure user accounts with email verification

## Technologies Used

- **Backend**: Python, Flask, OpenAI API, LanceDB, BeautifulSoup
- **Frontend**: React, Material-UI, Axios
- **Authentication**: JWT-based token authentication
- **Data Storage**: SQLite (auth), LanceDB (vector database) 