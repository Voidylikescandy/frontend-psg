# Political Speech Generator

A comprehensive web application that generates personalized political speeches using RAG (Retrieval Augmented Generation) architecture and large language models.

## Setup Instructions

### Windows Setup

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/Voidylikescandy/frontend-psg.git
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
    OPENAI_API=key
    SERPER_API_KEY=key
    EMAIL_USER=mail
    EMAIL_PASSWORD=password
    EMAIL_FROM=from
   ```

5. Create environment variables file (`.env`) in the frontend directory with the following keys:
   ```
   cd frontend
   ```
   Create a file named `.env`:
   ```
   REACT_APP_AZURE_TRANSLATOR_API_KEY=your_azure_translator_key
   REACT_APP_AZURE_TRANSLATOR_REGION=your_azure_region
   REACT_APP_SAPLING_API_KEY=your_sapling_api_key
   REACT_APP_GROQ_API_KEY=your_groq_api_key
   REACT_APP_API_URL=your_backend_url
   ```

### Linux/macOS Setup

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/Voidylikescandy/frontend-psg.git
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
    OPENAI_API=key
    SERPER_API_KEY=key
    EMAIL_USER=mail
    EMAIL_PASSWORD=password
    EMAIL_FROM=from
   ```

5. Create environment variables file (`.env`) in the frontend directory with the following keys:
   ```
   cd frontend
   ```
   Create a file named `.env`:
   ```
   REACT_APP_AZURE_TRANSLATOR_API_KEY=your_azure_translator_key
   REACT_APP_AZURE_TRANSLATOR_REGION=your_azure_region
   REACT_APP_SAPLING_API_KEY=your_sapling_api_key
   REACT_APP_GROQ_API_KEY=your_groq_api_key
   REACT_APP_API_URL=your_backend_url
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

### Core Technologies
- **Backend**: Python 3.x, Flask, RESTful API architecture
- **Frontend**: React.js, Material-UI component library
- **Database**: SQLite (authentication), LanceDB (vector database for RAG)
- **Authentication**: JWT-based token authentication with bcrypt password hashing

### LLM & AI Components
- **Primary LLM**: Qwen 3 235B model via DeepInfra API for speech generation
- **Vector Embeddings**: BAAI/bge-small-en-v1.5 for semantic search capabilities
- **RAG System**: Custom Retrieval-Augmented Generation implementation
- **AI Suggestions**: Llama 4 model via Groq API for content suggestions in the UI

### Data Retrieval & Processing
- **Web Search**: Google Search integration via Serper API
- **Web Scraping**: BeautifulSoup4 for extracting content from web pages
- **Vector Database**: LanceDB for storing and retrieving document embeddings
- **Text Processing**: LangChain text splitters for document chunking

### Analysis & Enhancement
- **Speech Analysis**: Sapling API for readability metrics and sentiment analysis
- **Translation**: Azure Translator API for multilingual speech support
- **Data Visualization**: Chart.js and React-ChartJS-2 for analytics visualization

### Development Tools
- **Package Management**: npm (frontend), pip (backend)
- **Environment Management**: python-dotenv for configuration
- **HTTP Client**: Axios for API communication
- **CORS Support**: Flask-CORS for cross-origin resource sharing
- **PDF Generation**: jsPDF for downloadable speech documents
- **Spreadsheet Support**: XLSX for data export/import

### Deployment & Infrastructure
- **Version Control**: Git
- **Environment Isolation**: Python virtual environments
- **Logging**: Custom logging system with rotating file handlers
- **Error Handling**: Comprehensive error tracking and reporting 