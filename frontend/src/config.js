// API URL from environment variable or fallback to localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default API_URL;