import axios from 'axios';

import API_URL from '../config';
import { AZURE_TRANSLATOR_API_KEY, AZURE_TRANSLATOR_REGION } from './constants';

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

export const translateSpeech = async (text, targetLanguage) => {
  try {
    // Azure Translator API endpoint
    const endpoint = "https://api.cognitive.microsofttranslator.com";
    const route = "/translate?api-version=3.0";
    
    // Create request with text to translate
    const response = await axios({
      baseURL: endpoint,
      url: route,
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_API_KEY,
        'Ocp-Apim-Subscription-Region': AZURE_TRANSLATOR_REGION,
        'Content-type': 'application/json',
      },
      params: {
        'to': targetLanguage
      },
      data: [{
        'text': text
      }],
    });

    // Extract translated text from response
    if (response.data && response.data.length > 0 && 
        response.data[0].translations && 
        response.data[0].translations.length > 0) {
      return response.data[0].translations[0].text;
    }
    
    throw new Error('Translation failed or returned empty result');
  } catch (error) {
    console.error('Error translating speech:', error);
    // If it's an axios error with response, use the backend error
    if (error.response && error.response.data) {
      const apiError = new Error(error.response.data.message || 'Failed to translate speech');
      apiError.error = error.response.data.error || 'ERR_TRANSLATION_FAILURE';
      throw apiError;
    }
    // If it's our custom error from above, pass it through
    if (error.error && error.message) {
      throw error;
    }
    // For other errors, create a generic error
    const genericError = new Error('Failed to connect to the translation service. Please try again.');
    genericError.error = 'ERR_TRANSLATION_FAILURE';
    throw genericError;
  }
};

// Create a named API object before exporting
const apiService = {
  generateSpeech,
  translateSpeech
};

export default apiService; 