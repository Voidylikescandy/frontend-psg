import axios from 'axios';

import API_URL from '../config';

// Set up axios interceptor to add the auth token to all requests
const setupAxiosInterceptors = () => {
  // Request interceptor - add token
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle authentication errors
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Check if admin user before redirecting
        const isAdmin = localStorage.getItem('adminToken') === 'true';
        
        if (!isAdmin) {
          // Only clear token and redirect for non-admin users
          localStorage.removeItem('token');
          if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
            window.location.href = '/login';
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

// Initialize interceptors
setupAxiosInterceptors();

export const generateSpeech = async (candidateData, speechParams = {}) => {
  try {
    // Combine candidate profile data with speech parameters
    const requestData = {
      ...candidateData,
      ...speechParams
    };
    
    console.log('Sending data to backend:', requestData);
    
    const response = await axios.post(`${API_URL}/api/generate-speech`, requestData);
    
    // Check if response contains an error field
    if (response.data.error) {
      const error = new Error(response.data.message);
      error.error = response.data.error;
      throw error;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error generating speech:', error);
    // If it's an axios error with response, use the backend error
    if (error.response && error.response.data) {
      const apiError = new Error(error.response.data.message || 'Failed to generate speech');
      apiError.error = error.response.data.error || 'ERR_API_FAILURE';
      throw apiError;
    }
    // If it's our custom error from above, pass it through
    if (error.error && error.message) {
      throw error;
    }
    // For other errors, create a generic error
    const genericError = new Error('Failed to connect to the server. Please try again.');
    genericError.error = 'ERR_API_FAILURE';
    throw genericError;
  }
};

// Create a named API object before exporting
const apiService = {
  generateSpeech
};

export default apiService; 