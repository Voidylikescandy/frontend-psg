import axios from 'axios';

import API_URL from '../config';

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