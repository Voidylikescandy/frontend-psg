import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const generateSpeech = async (candidateData, speechParams = {}) => {
  try {
    // Combine candidate profile data with speech parameters
    const requestData = {
      ...candidateData,
      ...speechParams
    };
    
    console.log('Sending data to backend:', requestData);
    
    const response = await axios.post(`${API_URL}/api/generate-speech`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
};

// Create a named API object before exporting
const apiService = {
  generateSpeech
};

export default apiService; 