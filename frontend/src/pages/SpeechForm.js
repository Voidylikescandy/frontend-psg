import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Divider,
  CircularProgress,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slider,
  Chip,
  Card,
  CardContent,
  Tooltip,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TextFileIcon from '@mui/icons-material/Description';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import JsonIcon from '@mui/icons-material/Code';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TranslateIcon from '@mui/icons-material/Translate';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DownloadIcon from '@mui/icons-material/Download';
import { jsPDF } from 'jspdf';
import { generateSpeech, getFormattedPrompt } from '../utils/api';
import TextInput from '../components/forms/TextInput';
import TextAreaWithWordLimit from '../components/forms/TextAreaWithWordLimit';
import MultiSelectDropdown from '../components/forms/MultiSelectDropdown';
import AISuggestionTextBox from '../components/forms/AISuggestionTextBox';
import PersuasionTechniqueSelector from '../components/forms/PersuasionTechniqueSelector';
import { 
  EXPERTISE_OPTIONS, 
  EDUCATION_LEVEL_OPTIONS,
  POLITICAL_AFFILIATION_OPTIONS,
  AFFILIATION_STRENGTH_OPTIONS,
  POLITICAL_PARTY_OPTIONS,
  CANDIDATES_BY_PARTY,
  CANDIDATE_OFFICE_MAPPING,
  CANDIDATE_BIO_MAPPING,
  SPEECH_TYPE_OPTIONS,
  CAMPAIGN_STAGE_OPTIONS,
  CALL_TO_ACTION_OPTIONS,
  SPEECH_TONE_OPTIONS,
  FORMALITY_OPTIONS,
  RHETORICAL_DEVICES_OPTIONS,
  PRIMARY_OBJECTIVE_MAP,
  TEST_SPEECH,
  PERSUASION_TECHNIQUE_OPTIONS,
  SPEECH_TYPE_MAPPING
} from '../utils/constants';

const SpeechForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State variables from CandidateProfile
  const [candidateForm, setCandidateForm] = useState({
    'candidate-name': '',
    'political-party': '',
    'other-party': '',
    'office-sought': '',
    'brief-bio': '',
    'key-strengths': [],
    // Audience Profile fields
    'age-range': [20, 60],
    'education-level': '',
    'socioeconomic-status': '',
    'cultural-background': '',
    'political-affiliation-type': '',
    'political-affiliation-strength': '',
    'primary-concerns': '',
    'existing-values': '',
    'occupation': '',
    'interests': '',
  });

  // State variables from SpeechParameters
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [speech, setSpeech] = useState('');
  const [error, setError] = useState('');
  const [enableRAG, setEnableRAG] = useState(true);
  const [useTestSpeech, setUseTestSpeech] = useState(false);
  const [speechParams, setSpeechParams] = useState({
    'speech-type': '',
    'other-speech-type': '',
    'primary-objective': '',
    'secondary-objective': '',
    'slogan': '',
    'main-message': '',
    'policy-points': [],
    'political-climate': '',
    'recent-events': '',
    'campaign-stage': '',
    'geographic-location': '',
    'key-messages': '',
    'personal-story': '',
    'anecdote': '',
    'hypothetical-scenario': '',
    'call-to-action': '',
    'cta-instructions': '',
    'speech-tone': '',
    'emotional-appeal': 'Neutral',
    'humor': 'Balanced',
    'formality': '',
    'rhetorical-devices': [],
    'speech-length': '',
    'persuasion-techniques': [],
    'persuasion-instructions': ''
  });
  const [speechResponse, setSpeechResponse] = useState({
    speech: '',
    key_themes: [],
    sentiment: { category: '', explanation: '' }
  });

  // Add a new state variable for downloading prompt
  const [promptLoading, setPromptLoading] = useState(false);

  // Clear form data when coming from home page
  useEffect(() => {
    // Check if we're coming directly from the home page
    if (location.state && location.state.fromHome) {
      // Clear all form data
      setCandidateForm({
        'candidate-name': '',
        'political-party': '',
        'other-party': '',
        'office-sought': '',
        'brief-bio': '',
        'key-strengths': [],
        // Audience Profile fields
        'age-range': [20, 60],
        'education-level': '',
        'socioeconomic-status': '',
        'cultural-background': '',
        'political-affiliation-type': '',
        'political-affiliation-strength': '',
        'primary-concerns': '',
        'existing-values': '',
        'occupation': '',
        'interests': '',
      });
      
      setSpeechParams({
        'speech-type': '',
        'other-speech-type': '',
        'primary-objective': '',
        'secondary-objective': '',
        'slogan': '',
        'main-message': '',
        'policy-points': [],
        'political-climate': '',
        'recent-events': '',
        'campaign-stage': '',
        'geographic-location': '',
        'key-messages': '',
        'personal-story': '',
        'anecdote': '',
        'hypothetical-scenario': '',
        'call-to-action': '',
        'cta-instructions': '',
        'speech-tone': '',
        'emotional-appeal': 'Neutral',
        'humor': 'Balanced',
        'formality': '',
        'rhetorical-devices': [],
        'speech-length': '',
        'persuasion-techniques': [],
        'persuasion-instructions': ''
      });
      
      setSpeechResponse({
        speech: '',
        key_themes: [],
        sentiment: { category: '', explanation: '' }
      });
      
      // Clear session storage
      sessionStorage.removeItem('filledCandidateProfile');
      sessionStorage.removeItem('speechParameters');
      sessionStorage.removeItem('candidateProfile');
    }
  }, [location]);

  // Combined useEffect from both components
  useEffect(() => {
    // Load candidate profile data from session storage
    const savedProfileData = sessionStorage.getItem('filledCandidateProfile');
    if (savedProfileData) {
      setCandidateForm(JSON.parse(savedProfileData));
    }

    // Load speech parameters from session storage
    const savedSpeechParams = sessionStorage.getItem('speechParameters');
    if (savedSpeechParams) {
      setSpeechParams(JSON.parse(savedSpeechParams));
    }

    // Load candidate profile from session storage for speech generation
    const savedProfile = sessionStorage.getItem('candidateProfile');
    if (savedProfile) {
      setCandidateProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Handle form field changes
  const handleChange = (field) => (event) => {
    const updatedForm = {
      ...candidateForm,
      [field]: event.target.value,
    };
    
    setCandidateForm(updatedForm);
    
    // Auto-save to session storage
    sessionStorage.setItem('filledCandidateProfile', JSON.stringify(updatedForm));
    
    // Also update the formatted candidate profile for speech generation
    updateCandidateProfile(updatedForm);
  };

  // Handle political party change
  const handlePartyChange = (event) => {
    const selectedParty = event.target.value;
    
    // Reset candidate name and office sought when party changes
    let updates = {
      'political-party': selectedParty,
      'candidate-name': '',
      'office-sought': '',
    };
    
    // If other is selected, clear the candidate name
    if (selectedParty === 'other') {
      updates['other-party'] = '';
    }
    
    const updatedForm = {
      ...candidateForm,
      ...updates
    };
    
    setCandidateForm(updatedForm);
    
    // Auto-save to session storage
    sessionStorage.setItem('filledCandidateProfile', JSON.stringify(updatedForm));
    
    // Update the formatted candidate profile
    updateCandidateProfile(updatedForm);
  };

  // Handle candidate name change
  const handleCandidateChange = (event) => {
    const selectedCandidate = event.target.value;
    
    // Update candidate name and set the office-sought based on mapping
    const updatedForm = {
      ...candidateForm,
      'candidate-name': selectedCandidate,
      'office-sought': CANDIDATE_OFFICE_MAPPING[selectedCandidate] || '',
      'brief-bio': CANDIDATE_BIO_MAPPING[selectedCandidate] || '', // Auto-fill bio if available
    };
    
    setCandidateForm(updatedForm);
    
    // Auto-save to session storage
    sessionStorage.setItem('filledCandidateProfile', JSON.stringify(updatedForm));
    
    // Update the formatted candidate profile
    updateCandidateProfile(updatedForm);
  };

  // Handle slider changes
  const handleSliderChange = (event, newValue) => {
    const updatedForm = {
      ...candidateForm,
      'age-range': newValue,
    };
    
    setCandidateForm(updatedForm);
    
    // Auto-save to session storage
    sessionStorage.setItem('filledCandidateProfile', JSON.stringify(updatedForm));
    
    // Update the formatted candidate profile
    updateCandidateProfile(updatedForm);
  };

  // Handle multi-select dropdown changes for candidate profile
  const handleMultiSelectChangeCandidate = (event) => {
    // Store the values
    const updatedForm = {
      ...candidateForm,
      'key-strengths': event.target.value,
    };
    
    setCandidateForm(updatedForm);
    
    // Auto-save to session storage
    sessionStorage.setItem('filledCandidateProfile', JSON.stringify(updatedForm));
    
    // Update the formatted candidate profile
    updateCandidateProfile(updatedForm);
  };

  // Helper function to update the formatted candidate profile for speech generation
  const updateCandidateProfile = (formData) => {
    // Create a new object with formatted values for submission
    const formattedForm = {
      ...formData,
      // Only include the combined political affiliation
      'political-affiliation': formData['political-affiliation-strength'] && formData['political-affiliation-type']
        ? `${formData['political-affiliation-strength']} ${formData['political-affiliation-type']}` 
        : '',
      // Format age range as a string
      'age-range': `${formData['age-range'][0]} - ${formData['age-range'][1]}`,
      // Since we're using the same value as label, no need for special formatting
      'key-strengths': Array.isArray(formData['key-strengths']) 
        ? formData['key-strengths'].join(', ')
        : formData['key-strengths'],
    };
    
    // Set the actual political-party value from other-party if 'other' is selected
    if (formattedForm['political-party'] === 'other' && formattedForm['other-party']) {
      formattedForm['political-party'] = formattedForm['other-party'];
    }
    
    // Remove the individual political affiliation fields and other-party before sending
    delete formattedForm['political-affiliation-type'];
    delete formattedForm['political-affiliation-strength'];
    delete formattedForm['other-party'];
    
    // Save data to session storage for speech generation
    sessionStorage.setItem('candidateProfile', JSON.stringify(formattedForm));
    
    // Update the candidateProfile state for use in speech generation
    setCandidateProfile(formattedForm);
  };

  // Handlers from SpeechParameters component

  // Handle speech parameter changes
  const handleSpeechParamChange = (field) => (event) => {
    const updatedParams = {
      ...speechParams,
      [field]: event.target.value,
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Handle slider changes for discrete values
  const handleEmotionalAppealChange = (event, newValue) => {
    // Map the numeric value to text
    let textValue;
    if (newValue === 0) textValue = 'Subdued';
    else if (newValue === 1) textValue = 'Neutral';
    else textValue = 'Emotional';
    
    const updatedParams = {
      ...speechParams,
      'emotional-appeal': textValue,
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Handle humor slider changes
  const handleHumorChange = (event, newValue) => {
    // Map the numeric value to text
    let textValue;
    if (newValue === 0) textValue = 'Serious';
    else if (newValue === 1) textValue = 'Balanced';
    else textValue = 'Humorous';
    
    const updatedParams = {
      ...speechParams,
      'humor': textValue,
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Handle multi-select dropdown changes for rhetorical devices
  const handleMultiSelectChange = (event) => {
    const updatedParams = {
      ...speechParams,
      'rhetorical-devices': event.target.value,
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Format rhetorical devices for backend
  const formatRhetoricalDevices = (devices) => {
    if (!devices || devices.length === 0) return '';
    return devices.join(', ');
  };

  // Handle speech type selection and auto-fill primary objective
  const handleSpeechTypeChange = (event) => {
    const selectedType = event.target.value;
    
    let updates = {
      'speech-type': selectedType
    };
    
    // If a predefined speech type is selected, set the primary objective
    if (selectedType !== 'other') {
      updates['primary-objective'] = PRIMARY_OBJECTIVE_MAP[selectedType] || '';
    }
    
    // If other is selected, clear the other-speech-type field
    if (selectedType === 'other') {
      updates['other-speech-type'] = '';
      updates['primary-objective'] = '';
    }
    
    const updatedParams = {
      ...speechParams,
      ...updates
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Handle adding a new policy point
  const handleAddPolicyPoint = () => {
    const newPolicyPoints = [...speechParams['policy-points'], ''];
    const updatedParams = {
      ...speechParams,
      'policy-points': newPolicyPoints
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Handle updating a policy point
  const handlePolicyPointChange = (index) => (event) => {
    const newPolicyPoints = [...speechParams['policy-points']];
    newPolicyPoints[index] = event.target.value;
    const updatedParams = {
      ...speechParams,
      'policy-points': newPolicyPoints
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Handle removing a policy point
  const handleRemovePolicyPoint = (index) => () => {
    const newPolicyPoints = speechParams['policy-points'].filter((_, i) => i !== index);
    const updatedParams = {
      ...speechParams,
      'policy-points': newPolicyPoints
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Format policy points for backend
  const formatPolicyPoints = (points) => {
    if (!points || points.length === 0) return '';
    
    return points
      .map((point, index) => `${index + 1}. ${point}`)
      .join(', ');
  };

  // Format story elements for backend
  const formatStoryElements = () => {
    const { 'personal-story': personalStory, anecdote, 'hypothetical-scenario': scenario } = speechParams;
    
    const elements = [];
    if (personalStory) elements.push(`Personal Story: ${personalStory}`);
    if (anecdote) elements.push(`Anecdote: ${anecdote}`);
    if (scenario) elements.push(`Hypothetical Scenario: ${scenario}`);
    
    return elements.join(', ');
  };

  // Add new handler for persuasion techniques
  const handlePersuasionTechniquesChange = (event) => {
    const updatedParams = {
      ...speechParams,
      'persuasion-techniques': event.target.value,
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Add new handler for persuasion instructions
  const handlePersuasionInstructionsChange = (event) => {
    const updatedParams = {
      ...speechParams,
      'persuasion-instructions': event.target.value,
    };
    
    // Auto-save to session storage
    sessionStorage.setItem('speechParameters', JSON.stringify(updatedParams));
    setSpeechParams(updatedParams);
  };

  // Generate speech
  const handleGenerateSpeech = async () => {
    if (!candidateProfile) {
      // Try to save the profile data first if it hasn't been saved
      updateCandidateProfile(candidateForm);
      
      if (!candidateProfile) {
        setError('Please fill out the candidate profile section first');
        return;
      }
    }

    try {
      setLoading(true);
      setError('');
      
      // If test speech is enabled, return the test speech without calling the API
      if (useTestSpeech) {
        setSpeech(TEST_SPEECH.speech);
        setSpeechResponse({
          speech: TEST_SPEECH.speech,
          key_themes: TEST_SPEECH.key_themes || [],
          sentiment: TEST_SPEECH.sentiment || { category: '', explanation: '' }
        });
        setLoading(false);
        return;
      }
      
      // Combine candidate profile and speech parameters
      const requestData = {
        ...candidateProfile,
        ...speechParams,
        // Format policy points
        'policy-points': formatPolicyPoints(speechParams['policy-points']),
        // Format story elements
        'story-elements': formatStoryElements(),
        // Format rhetorical devices
        'rhetorical-devices': formatRhetoricalDevices(speechParams['rhetorical-devices']),
        // Format persuasion techniques with full descriptions
        'persuasion-techniques': formatPersuasionTechniquesWithDescriptions(speechParams['persuasion-techniques']),
        // Add enable_rag parameter
        'enable_rag': enableRAG
      };
      
      // Set the actual speech-type value from other-speech-type if 'other' is selected
      if (requestData['speech-type'] === 'other' && requestData['other-speech-type']) {
        requestData['speech-type'] = requestData['other-speech-type'];
      }
      
      // Add speech type context from mapping if available
      const speechType = requestData['speech-type'];
      if (speechType && SPEECH_TYPE_MAPPING[speechType]) {
        requestData['speech-type-context'] = SPEECH_TYPE_MAPPING[speechType];
      }
      
      // Remove the other-speech-type before sending
      delete requestData['other-speech-type'];
      
      // Call the API to generate a speech
      const response = await generateSpeech(requestData);
      
      setSpeech(response.speech);
      setSpeechResponse({
        speech: response.speech,
        key_themes: response.key_themes || [],
        sentiment: response.sentiment || { category: '', explanation: '' }
      });
    } catch (err) {
      // Handle backend errors
      if (err.error && err.message) {
        setError(`${err.error}: ${err.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new formatter for persuasion techniques with detailed descriptions
  const formatPersuasionTechniquesWithDescriptions = (techniques) => {
    if (!techniques || techniques.length === 0) return '';
    
    const formattedTechniques = techniques.map(technique => {
      const techniqueObject = PERSUASION_TECHNIQUE_OPTIONS.find(option => option.value === technique);
      if (!techniqueObject) return technique;
      
      return `${techniqueObject.label} - ${techniqueObject.explanation}`;
    });
    
    const result = formattedTechniques.join(' ');
    console.log("Formatted persuasion techniques with descriptions:", result);
    return result;
  };

  // Add a new formatter for persuasion techniques
  const formatPersuasionTechniques = (techniques) => {
    if (!techniques || techniques.length === 0) return '';
    
    const formattedTechniques = techniques.map(technique => {
      const techniqueObject = PERSUASION_TECHNIQUE_OPTIONS.find(option => option.value === technique);
      return techniqueObject ? techniqueObject.label : technique;
    });
    
    return formattedTechniques.join(', ');
  };

  // Download the generated speech as a text file
  const downloadSpeechAsText = () => {
    if (!speechResponse.speech) return;
    
    const element = document.createElement('a');
    const file = new Blob([speechResponse.speech], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `political_speech_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download the generated speech as a PDF file
  const downloadSpeechAsPDF = () => {
    if (!speechResponse.speech) return;
    
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set title
    const title = `Political Speech - ${candidateProfile?.['candidate-name'] || 'Unknown'} (${new Date().toLocaleDateString()})`;
    doc.setFontSize(16);
    doc.text(title, 20, 20);
    
    // Add metadata
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    if (speechParams['speech-type']) {
      doc.text(`Speech Type: ${speechParams['speech-type']}`, 20, 30);
    }
    if (speechParams['campaign-stage']) {
      doc.text(`Campaign Stage: ${speechParams['campaign-stage']}`, 20, 37);
    }
    if (speechResponse.sentiment?.category) {
      doc.text(`Tone: ${speechResponse.sentiment.category}`, 20, 44);
    }
    
    // Add horizontal line
    doc.setDrawColor(220, 220, 220);
    doc.line(20, 48, 190, 48);
    
    // Set text options for the main content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    
    // Split the text into lines that fit the page width
    const speechText = speechResponse.speech;
    const lines = doc.splitTextToSize(speechText, 175); // Slightly wider text area
    
    // Define page dimensions and parameters for optimal text placement
    const startY = 55; // Starting Y position on first page (after metadata)
    const lineHeight = 5.5; // Further reduce line height to fit more text
    const pageHeight = doc.internal.pageSize.height;
    const pageMarginBottom = 12; // Reduced bottom margin
    
    // Calculate usable page heights
    const usableFirstPageHeight = pageHeight - startY - pageMarginBottom;
    const usableOtherPagesHeight = pageHeight - 15 - pageMarginBottom; // Reduced top margin for other pages
    
    // Calculate how many lines can fit on each page type (using at least 95% of available space)
    const maxLinesOnFirstPage = Math.floor(usableFirstPageHeight / lineHeight);
    const maxLinesOnOtherPages = Math.floor(usableOtherPagesHeight / lineHeight);
    
    // Add text to the PDF with improved pagination
    let currentPage = 1;
    let currentLine = 0;
    let currentPosition = startY;
    
    while (currentLine < lines.length) {
      // Determine how many lines to put on this page (at least 95% capacity unless not enough lines left)
      const linesRemaining = lines.length - currentLine;
      const maxLinesThisPage = currentPage === 1 ? maxLinesOnFirstPage : maxLinesOnOtherPages;
      
      // Use at least 95% of available space unless we don't have enough content
      const minimumLines = Math.floor(maxLinesThisPage * 0.95);
      const linesOnThisPage = linesRemaining <= maxLinesThisPage ? 
        linesRemaining : 
        Math.max(minimumLines, Math.min(maxLinesThisPage, linesRemaining));
      
      // Add the text chunk for this page
      const pageContent = lines.slice(currentLine, currentLine + linesOnThisPage);
      doc.text(pageContent, 20, currentPosition);
      
      // Move to next chunk of lines
      currentLine += linesOnThisPage;
      
      // If more content remains, add a new page
      if (currentLine < lines.length) {
        doc.addPage();
        currentPage++;
        currentPosition = 15; // Reduced top margin for subsequent pages
      }
    }
    
    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        'Page ' + String(i) + ' of ' + String(pageCount),
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        {
          align: 'center'
        }
      );
    }
    
    // Add key themes section if available
    if (speechResponse.key_themes && speechResponse.key_themes.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Key Themes', 20, 20);
      
      doc.setFontSize(11);
      speechResponse.key_themes.forEach((theme, index) => {
        doc.text(`• ${theme}`, 20, 30 + (index * 8));
      });
      
      if (speechResponse.sentiment?.explanation) {
        doc.text('Sentiment Analysis', 20, 30 + (speechResponse.key_themes.length * 8) + 10);
        doc.setFontSize(10);
        const sentimentLines = doc.splitTextToSize(speechResponse.sentiment.explanation, 170);
        doc.text(sentimentLines, 20, 30 + (speechResponse.key_themes.length * 8) + 20);
      }
    }
    
    // Save the PDF
    doc.save(`political_speech_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Download the generated speech as a DOC file
  const downloadSpeechAsDoc = () => {
    if (!speechResponse.speech) return;
  
    const element = document.createElement('a');
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'></head><body>`;
    const footer = `</body></html>`;
    const html = header + speechResponse.speech.replace(/\n/g, '<br>') + footer;
  
    const file = new Blob([html], { type: 'application/msword' });
    element.href = URL.createObjectURL(file);
    element.download = `political_speech_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download the complete response as JSON
  const downloadResponseAsJSON = () => {
    if (!speechResponse.speech) return;
    
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(speechResponse, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `speech_data_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Navigate to edit page with current speech data
  const handleEditSpeech = () => {
    // Save the current speech data to sessionStorage for the edit page
    sessionStorage.setItem('editSpeechData', JSON.stringify(speechResponse));
    
    // Navigate to the edit page
    navigate('/speech-edit');
  };

  // Navigate to analysis page with current speech data
  const handleAnalyseSpeech = () => {
    // Save the current speech data to sessionStorage for the analysis page
    sessionStorage.setItem('analysisSpeechData', JSON.stringify(speechResponse));
    
    // Navigate to the analysis page
    navigate('/speech-analysis');
  };

  // Navigate to translate page with current speech data
  const handleTranslateSpeech = () => {
    // Save the current speech data to sessionStorage for the translate page
    sessionStorage.setItem('translateSpeechData', JSON.stringify(speechResponse));
    
    // Navigate to the translate page
    navigate('/speech-translate');
  };

  // Check if 'other' party is selected
  const isOtherPartySelected = candidateForm['political-party'] === 'other';
  
  // Get available candidates based on selected party
  const availableCandidates = candidateForm['political-party'] && !isOtherPartySelected 
    ? CANDIDATES_BY_PARTY[candidateForm['political-party']] || []
    : [];

  // Add a new function to download the formatted prompt
  const handleDownloadPrompt = async () => {
    if (!candidateProfile) {
      // Try to save the profile data first if it hasn't been saved
      updateCandidateProfile(candidateForm);
      
      if (!candidateProfile) {
        setError('Please fill out the candidate profile section first');
        return;
      }
    }

    try {
      setPromptLoading(true);
      setError('');
      
      // Combine candidate profile and speech parameters
      const requestData = {
        ...candidateProfile,
        ...speechParams,
        // Format policy points
        'policy-points': formatPolicyPoints(speechParams['policy-points']),
        // Format story elements
        'story-elements': formatStoryElements(),
        // Format rhetorical devices
        'rhetorical-devices': formatRhetoricalDevices(speechParams['rhetorical-devices']),
        // Format persuasion techniques with full descriptions
        'persuasion-techniques': formatPersuasionTechniquesWithDescriptions(speechParams['persuasion-techniques']),
        // Add enable_rag parameter
        'enable_rag': enableRAG
      };
      
      // Set the actual speech-type value from other-speech-type if 'other' is selected
      if (requestData['speech-type'] === 'other' && requestData['other-speech-type']) {
        requestData['speech-type'] = requestData['other-speech-type'];
      }
      
      // Add speech type context from mapping if available
      const speechType = requestData['speech-type'];
      if (speechType && SPEECH_TYPE_MAPPING[speechType]) {
        requestData['speech-type-context'] = SPEECH_TYPE_MAPPING[speechType];
      }
      
      // Remove the other-speech-type before sending
      delete requestData['other-speech-type'];
      
      // Call the API to get the formatted prompt
      const formattedPrompt = await getFormattedPrompt(requestData);
      
      // Download the formatted prompt as a text file
      const element = document.createElement('a');
      const file = new Blob([formattedPrompt], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `speech_prompt_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (err) {
      // Handle backend errors
      if (err.error && err.message) {
        setError(`${err.error}: ${err.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error:', err);
    } finally {
      setPromptLoading(false);
    }
  };

  return (
    <>
      {/* Candidate Profile Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium">Welcome to the Political Speech Generator!</Typography>
          <Typography variant="body2">
            This tool helps you create personalized political speeches by filling out three main sections: Candidate Profile, Audience Profile, and Speech Parameters. 
            Look for the <AutoAwesomeIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> icon to get AI-powered suggestions as you work through the form.
            Required fields are marked with an asterisk (*).
          </Typography>
        </Alert>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Candidate Profile
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Enter details about the candidate to personalize the generated speech.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          {/* Political Party Input Field (replacing dropdown) */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Enter the political party the candidate represents.
              </Typography>
            </Box>
            <TextInput
              id="political-party"
              label="Political Party"
              value={candidateForm['political-party']}
              onChange={handleChange('political-party')}
              placeholder="Enter political party name"
              required
            />
          </Grid>
          
          {/* Other Party Text Field - Hidden since we now directly input the party name */}
          
          {/* Candidate Name Input Field (replacing dropdown) */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Enter the full name of the candidate
              </Typography>
            </Box>
            <TextInput
              id="candidate-name"
              label="Name"
              value={candidateForm['candidate-name']}
              onChange={handleChange('candidate-name')}
              placeholder="Enter candidate's full name"
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Indicate the position or office the candidate is running for in the election.
              </Typography>
            </Box>
            <TextInput
              id="office-sought"
              label="Office Sought"
              value={candidateForm['office-sought']}
              onChange={handleChange('office-sought')}
              placeholder="e.g., Prime Minister, Chief Minister, Member of Parliament, etc."
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Provide a brief biography including experience, qualifications, and relevant personal details. 
                This information will be used to inject authentic personal anecdotes and examples into the speech.
              </Typography>
            </Box>
            <TextAreaWithWordLimit
              id="brief-bio"
              label="Brief Bio (Max 500 words)"
              value={candidateForm['brief-bio']}
              onChange={handleChange('brief-bio')}
              placeholder="Include experience, qualifications, and relevant personal details."
              maxWords={500}
              rows={6}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Select the policy areas where the candidate has expertise or wants to focus on in the speech.
                Multiple selections are allowed.
              </Typography>
            </Box>
            <MultiSelectDropdown
              id="key-strengths"
              label="Key Strengths/Expertise"
              value={Array.isArray(candidateForm['key-strengths']) 
                ? candidateForm['key-strengths'] 
                : candidateForm['key-strengths'].split(', ').filter(s => s !== '')}
              onChange={handleMultiSelectChangeCandidate}
              options={EXPERTISE_OPTIONS}
              helperText="Select all areas of expertise that apply"
              required
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Audience Profile Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Audience Profile
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Define the target audience for the speech to make it more relevant and engaging.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Pro Tip:</strong> The more specific you are about your audience, the more tailored and effective your speech will be. 
            Defining your audience helps the AI understand who you're speaking to and what matters to them.
          </Typography>
        </Alert>

        <Grid container spacing={2}>
          {/* Age Range Slider */}
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Specify the age range of your target audience. This helps tailor the speech's language, references, and topics.
              </Typography>
            </Box>
            <Typography id="age-range-slider" gutterBottom>
              Age Range: {candidateForm['age-range'][0]} - {candidateForm['age-range'][1]}
            </Typography>
            <Slider
              value={candidateForm['age-range']}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={10}
              max={100}
              aria-labelledby="age-range-slider"
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Occupation */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Describe the most common occupations of your audience. This helps tailor the speech to address professional concerns.
              </Typography>
            </Box>
            <TextInput
              id="occupation"
              label="Occupation"
              value={candidateForm['occupation']}
              onChange={handleChange('occupation')}
              placeholder="e.g., Teachers, IT professionals, Factory workers, Small business owners"
            />
          </Grid>

          {/* Interests */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                List common interests and hobbies of your audience. This helps relate to their lifestyle and create meaningful connections.
              </Typography>
            </Box>
            <TextInput
              id="interests"
              label="Interests"
              value={candidateForm['interests']}
              onChange={handleChange('interests')}
              placeholder="e.g., Sports, Technology, Community events, Traditional arts"
            />
          </Grid>

          {/* Education Level */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Select the predominant education level of your audience. This helps determine the complexity of language and concepts.
              </Typography>
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="education-level-label">Education Level</InputLabel>
              <Select
                labelId="education-level-label"
                id="education-level"
                value={candidateForm['education-level']}
                label="Education Level"
                onChange={handleChange('education-level')}
                required
              >
                {EDUCATION_LEVEL_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Socioeconomic Status */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Describe the socioeconomic status of your audience. This helps tailor economic messaging and policy discussions.
              </Typography>
            </Box>
            <TextInput
              id="socioeconomic-status"
              label="Socioeconomic Status"
              value={candidateForm['socioeconomic-status']}
              onChange={handleChange('socioeconomic-status')}
              placeholder="e.g., Middle class, Working class, Mixed income levels"
            />
          </Grid>

          {/* Cultural Background */}
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Describe the cultural background of your audience. This helps incorporate relevant cultural references and values.
              </Typography>
            </Box>
            <TextInput
              id="cultural-background"
              label="Cultural Background"
              value={candidateForm['cultural-background']}
              onChange={handleChange('cultural-background')}
              placeholder="e.g., Urban professionals, Rural farmers, Diverse metropolitan"
            />
          </Grid>

          {/* Political Affiliation */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Select the general political leaning of your audience.
              </Typography>
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="political-affiliation-type-label">Political Affiliation</InputLabel>
              <Select
                labelId="political-affiliation-type-label"
                id="political-affiliation-type"
                value={candidateForm['political-affiliation-type']}
                label="Political Affiliation"
                onChange={handleChange('political-affiliation-type')}
              >
                {POLITICAL_AFFILIATION_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Political Affiliation Strength */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Indicate how strongly your audience holds their political views.
              </Typography>
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="political-affiliation-strength-label">Affiliation Strength</InputLabel>
              <Select
                labelId="political-affiliation-strength-label"
                id="political-affiliation-strength"
                value={candidateForm['political-affiliation-strength']}
                label="Affiliation Strength"
                onChange={handleChange('political-affiliation-strength')}
              >
                {AFFILIATION_STRENGTH_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Primary Concerns */}
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                List the main concerns and issues that matter most to your audience. Separate multiple concerns with commas.
              </Typography>
            </Box>
            <AISuggestionTextBox
              id="primary-concerns"
              label="Primary Concerns/Needs"
              value={candidateForm['primary-concerns']}
              onChange={handleChange('primary-concerns')}
              placeholder="e.g., Job security, Healthcare costs, Education quality, Climate change"
              promptPlaceholder="Generate a list of primary voter concerns for a constituency with the demographics I've described..."
              rows={2}
              contextInfo="Primary concerns/needs are the key issues that matter most to your target audience. These will help tailor the speech to address specific problems and interests of the voters."
              systemPrompt="You are a political strategist helping to identify key voter concerns for a political speech. Provide a concise list of relevant issues based on the information provided, separated by commas."
            />
          </Grid>

          {/* Existing Values/Beliefs */}
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Describe the core values and beliefs held by your audience. Separate multiple values with commas.
              </Typography>
            </Box>
            <AISuggestionTextBox
              id="existing-values"
              label="Existing Values/Beliefs"
              value={candidateForm['existing-values']}
              onChange={handleChange('existing-values')}
              placeholder="e.g., Family values, Individual liberty, Community welfare, Environmental stewardship"
              promptPlaceholder="Identify core values and beliefs likely held by this voter demographic..."
              rows={2}
              contextInfo="Existing values/beliefs are the core principles that your target audience strongly identifies with. Understanding these values helps create speeches that resonate with their worldview."
              systemPrompt="You are a political analyst specializing in voter values and beliefs. Generate a concise list of core values that would be important to the described audience, separated by commas."
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Speech Parameters Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Speech Parameters
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Configure speech settings and generate your political speech.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Getting Started:</strong> Each section below helps shape different aspects of your speech. You don't need to fill out every field—focus on the ones most relevant to your speech type. 
          </Typography>
        </Alert>

        {/* Speech Objective Subsection */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Speech Objective
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Define the purpose and goals of your speech.
          </Typography>

          <Grid container spacing={2}>
            {/* Speech Type Dropdown */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Select the type of speech that best matches your event and audience.
                </Typography>
              </Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="speech-type-label">Speech Type</InputLabel>
                <Select
                  labelId="speech-type-label"
                  id="speech-type"
                  value={speechParams['speech-type']}
                  label="Speech Type"
                  onChange={handleSpeechTypeChange}
                  required
                >
                  {SPEECH_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Other Speech Type Text Field (shown only when 'other' is selected) */}
            {speechParams['speech-type'] === 'other' && (
              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2.7 }}>
                    Enter the type of speech you want to generate.
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="other-speech-type"
                  label="Custom Speech Type"
                  value={speechParams['other-speech-type']}
                  onChange={handleSpeechParamChange('other-speech-type')}
                  placeholder="e.g., Thanksgiving Address, University Commencement, etc."
                  required
                />
              </Grid>
            )}

            {/* Primary Objective */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  The main goal of your speech. This is auto-filled based on the selected speech type, but you can customize it.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="primary-objective"
                label="Primary Objective"
                value={speechParams['primary-objective']}
                onChange={handleSpeechParamChange('primary-objective')}
                placeholder="What is the main purpose of this speech?"
                promptPlaceholder="Suggest a compelling primary objective for this type of political speech..."
                rows={2}
                required
                contextInfo="The primary objective is the main goal your speech aims to achieve. It will guide the overall structure and messaging of your speech. This field is auto-filled based on the speech type you selected, but you can modify or enhance it."
                systemPrompt="You are an expert speech writer helping to define a clear primary objective for a political speech. Based on the speech type and context, craft a compelling primary objective that will guide the speech's development."
              />
            </Grid>

            {/* Secondary Objective */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Additional goals or purposes for your speech.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="secondary-objective"
                label="Secondary Objective"
                value={speechParams['secondary-objective']}
                onChange={handleSpeechParamChange('secondary-objective')}
                placeholder="What else would you like to accomplish with this speech?"
                promptPlaceholder="Generate secondary objectives that would complement the primary goal of this speech..."
                rows={2}
                contextInfo="Secondary objectives are additional goals your speech should accomplish beyond the primary purpose. These can include building rapport with the audience, addressing specific concerns, or setting the stage for future messaging."
                systemPrompt="You are a strategic political communications expert. Based on the provided context, suggest effective secondary objectives that complement the primary goal of the speech and add depth to its purpose."
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Campaign Core Message Subsection */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Campaign Core Message
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Define the central theme and key messages of your campaign.
          </Typography>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Core Message Importance:</strong> Your main message and policy points form the foundation of your speech. Be specific about what makes your candidate unique and what concrete policies they support. These elements will be emphasized throughout the generated speech.
            </Typography>
          </Alert>

          <Grid container spacing={2}>
            {/* Slogan */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Enter a short, memorable slogan that captures the essence of your campaign.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="slogan"
                label="Campaign Slogan"
                value={speechParams['slogan']}
                onChange={handleSpeechParamChange('slogan')}
                placeholder="e.g., Building a Brighter Tomorrow Together"
                promptPlaceholder="Create a memorable campaign slogan for this candidate and platform..."
                rows={1}
                contextInfo="A campaign slogan is a short, memorable phrase that captures the essence of your campaign message and is easily repeatable. It should reflect your core values and vision."
                systemPrompt="You are a political campaign messaging expert specializing in creating memorable slogans. Create a short, impactful slogan that captures the essence of the campaign based on the provided information. Keep it under 8 words, memorable, and aligned with the candidate's party and values."
              />
            </Grid>

            {/* Main Message/Vision */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Describe your central campaign theme and vision for the future (maximum 300 words).
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="main-message"
                label="Main Message/Vision"
                value={speechParams['main-message']}
                onChange={handleSpeechParamChange('main-message')}
                placeholder="Outline the desired future state and central theme you want to convey..."
                promptPlaceholder="Draft a compelling vision statement for this campaign that captures the candidate's aspirations..."
                rows={3}
                required
                contextInfo="The main message or vision is the central theme of your campaign. It should articulate your vision for the future and what you stand for in a compelling way."
                systemPrompt="You are a visionary political strategist. Craft a compelling main message or vision statement that articulates the candidate's vision for the future. Keep it inspirational, forward-looking, and aligned with the candidate's party values. Focus on what sets this vision apart from opponents."
              />
            </Grid>

            {/* Key Policy Points */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Add key policy points that will be highlighted in your speech.
                </Typography>
              </Box>
              
              <List>
                {speechParams['policy-points'].map((point, index) => (
                  <ListItem 
                    key={index} 
                    disableGutters
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={handleRemovePolicyPoint(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText 
                      primary={
                        <AISuggestionTextBox
                          id={`policy-point-${index}`}
                          label={`Policy Point ${index + 1}`}
                          value={point}
                          onChange={handlePolicyPointChange(index)}
                          placeholder={`Enter policy point ${index + 1}`}
                          promptPlaceholder="Generate a specific, actionable policy point that addresses voter concerns..."
                          rows={2}
                          contextInfo="Policy points are specific proposals or positions that form the substance of your speech. Each point should be clear, relevant to your audience, and aligned with your overall message."
                          systemPrompt="You are a policy expert helping to craft clear, compelling policy points for a political speech. Create a specific, actionable policy point that aligns with the candidate's platform and addresses voter concerns. Focus on one issue and make it concise yet substantive."
                        />
                      } 
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                startIcon={<AddCircleIcon />}
                variant="outlined"
                color="primary"
                onClick={handleAddPolicyPoint}
                sx={{ mt: 1 }}
              >
                Add Policy Point
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Content and Messaging Subsection */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Content and Messaging
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Define key messages, storytelling elements, and calls to action for your speech.
          </Typography>

          <Grid container spacing={2}>
            {/* Key Messages - Using the new AI Suggestion component */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  The central messages that should be emphasized throughout the speech. These can include policy priorities, values, or vision statements.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="key-messages"
                label="Key Messages"
                value={speechParams['key-messages']}
                onChange={handleSpeechParamChange('key-messages')}
                placeholder="Enter the main messages that should be emphasized in the speech..."
                promptPlaceholder="Generate clear, persuasive key messages that should be emphasized throughout this speech..."
                required
                rows={3}
                contextInfo="This information will be used for speech generation. Key messages include the main elements of your speech that you want the audience to remember. Generate key messages based on the political context, candidate profile, and campaign objectives."
                systemPrompt="You are an expert political speech writer helping to craft persuasive key messages. Keep responses concise, impactful and aligned with the candidate's political party and positions."
              />
            </Grid>

            {/* Storytelling Elements Section */}
            <Grid item xs={12}>
              <Box mt={2} mb={1}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Storytelling Elements
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Add narrative elements to make your speech more engaging and relatable.
                </Typography>
              </Box>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Storytelling Tips:</strong> Great speeches often include stories that emotionally connect with the audience. You don't need to fill all three storytelling fields—even one well-crafted story can make your speech memorable. Try the AI suggestion feature to help craft compelling narratives.
                </Typography>
              </Alert>
            </Grid>

            {/* Personal Story */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Share a personal experience or story that relates to the speech's theme.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="personal-story"
                label="Personal Story"
                value={speechParams['personal-story']}
                onChange={handleSpeechParamChange('personal-story')}
                placeholder="Describe a personal experience that illustrates your message..."
                promptPlaceholder="Draft a compelling personal story for this candidate that illustrates their connection to the speech theme..."
                rows={2}
                contextInfo="A personal story is a narrative from the candidate's own life that illustrates a key point in the speech. Effective personal stories create emotional connections and humanize the candidate."
                systemPrompt="You are a political speechwriter specializing in narrative. Craft a compelling personal story that illustrates the candidate's connection to the speech theme. The story should be authentic-sounding, relatable, and emotionally resonant while reinforcing key campaign messages."
              />
            </Grid>

            {/* Anecdote */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Include a short, amusing or interesting story about a real incident or person.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="anecdote"
                label="Anecdote"
                value={speechParams['anecdote']}
                onChange={handleSpeechParamChange('anecdote')}
                placeholder="Share a relevant anecdote that supports your message..."
                promptPlaceholder="Create a brief, engaging anecdote that would effectively illustrate a key point of this speech..."
                rows={2}
                contextInfo="An anecdote is a short, interesting story about a real incident or person that helps illustrate a point in your speech. Unlike personal stories, anecdotes can be about others or historical events."
                systemPrompt="You are a storytelling expert for political speeches. Create a brief, engaging anecdote (about someone other than the candidate) that effectively illustrates a key point of the speech. The anecdote should be memorable and clearly connect to the message."
              />
            </Grid>

            {/* Hypothetical Scenario */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Describe a hypothetical scenario that illustrates your point or vision.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="hypothetical-scenario"
                label="Hypothetical Scenario"
                value={speechParams['hypothetical-scenario']}
                onChange={handleSpeechParamChange('hypothetical-scenario')}
                placeholder="Paint a picture of what could be possible or what might happen..."
                promptPlaceholder="Generate a hypothetical scenario that illustrates the potential impact of these policies..."
                rows={2}
                contextInfo="A hypothetical scenario is an imagined situation that helps audiences visualize either a positive future that could result from your policies or negative outcomes that might occur without them."
                systemPrompt="You are a creative political communicator. Develop a vivid hypothetical scenario that helps the audience visualize either the benefits of the candidate's proposals or the consequences of inaction. Make it realistic, specific, and emotionally engaging."
              />
            </Grid>

            {/* Call to Action Section */}
            <Grid item xs={12}>
              <Box mt={2} mb={1}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Call to Action
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Define what you want your audience to do after hearing your speech.
                </Typography>
              </Box>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Effective CTAs:</strong> The best calls to action are specific, actionable, and easy to follow. Include clear next steps (website links, contact information, event dates) so your audience knows exactly what to do. A strong CTA can significantly increase audience engagement after your speech.
                </Typography>
              </Alert>
            </Grid>

            {/* Call to Action Type */}
            <Grid item xs={12} md={6}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Select the type of action you want your audience to take.
                </Typography>
              </Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="call-to-action-label">Call to Action Type</InputLabel>
                <Select
                  labelId="call-to-action-label"
                  id="call-to-action"
                  value={speechParams['call-to-action']}
                  label="Call to Action Type"
                  onChange={handleSpeechParamChange('call-to-action')}
                >
                  {CALL_TO_ACTION_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* CTA Instructions */}
            <Grid item xs={12} md={6}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Provide specific instructions for your call to action.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="cta-instructions"
                label="Specific Instructions"
                value={speechParams['cta-instructions']}
                onChange={handleSpeechParamChange('cta-instructions')}
                placeholder="e.g., Visit our website at www.example.com to sign up as a volunteer"
                promptPlaceholder="Write specific, actionable instructions for this call to action type..."
                rows={2}
                contextInfo="Call to action instructions provide specific, actionable guidance for your audience on how to respond to your speech. This should include clear steps, relevant contact information, or specific dates/locations."
                systemPrompt="You are a campaign engagement specialist. Create clear, specific instructions for the audience to follow through on the selected call to action. Include concrete details (like websites, dates, locations) that make it easy for listeners to take the desired action immediately after the speech."
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Speech Tone and Style Subsection */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Speech Tone and Style
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Define the tone, style, and rhetorical elements of your speech.
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Tone Guidance:</strong> Different speech types call for different tones. For rallies, consider more emotional and energetic styles. For policy addresses, a more formal and measured approach often works better. Match your tone to both your audience expectations and the speech setting.
            </Typography>
          </Alert>

          <Grid container spacing={2}>
            {/* Overall Tone */}
            <Grid item xs={12} md={6}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Select the overall tone that best matches the mood and purpose of your speech.
                </Typography>
              </Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="speech-tone-label">Overall Tone</InputLabel>
                <Select
                  labelId="speech-tone-label"
                  id="speech-tone"
                  value={speechParams['speech-tone']}
                  label="Overall Tone"
                  onChange={handleSpeechParamChange('speech-tone')}
                >
                  {SPEECH_TONE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Formality */}
            <Grid item xs={12} md={6}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Select the level of formality appropriate for your audience and setting.
                </Typography>
              </Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="formality-label">Formality Level</InputLabel>
                <Select
                  labelId="formality-label"
                  id="formality"
                  value={speechParams['formality']}
                  label="Formality Level"
                  onChange={handleSpeechParamChange('formality')}
                >
                  {FORMALITY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Emotional Appeal Slider */}
            <Grid item xs={12}>
              <Box mb={1} mt={2}>
                <Typography variant="body2" color="textSecondary">
                  Select the level of emotional appeal in your speech.
                </Typography>
              </Box>
              <Box px={2}>
                <Typography id="emotional-appeal-slider" gutterBottom>
                  Emotional Appeal: {speechParams['emotional-appeal']}
                </Typography>
                <Slider
                  value={speechParams['emotional-appeal'] === 'Subdued' ? 0 : speechParams['emotional-appeal'] === 'Neutral' ? 1 : 2}
                  onChange={handleEmotionalAppealChange}
                  aria-labelledby="emotional-appeal-slider"
                  valueLabelDisplay="off"
                  step={1}
                  marks={[
                    { value: 0, label: 'Subdued' },
                    { value: 1, label: 'Neutral' },
                    { value: 2, label: 'Emotional' }
                  ]}
                  min={0}
                  max={2}
                  sx={{ mb: 2 }}
                />
              </Box>
            </Grid>

            {/* Humor Slider */}
            <Grid item xs={12}>
              <Box mb={1} mt={2}>
                <Typography variant="body2" color="textSecondary">
                  Select the level of humor in your speech.
                </Typography>
              </Box>
              <Box px={2}>
                <Typography id="humor-slider" gutterBottom>
                  Humor: {speechParams['humor']}
                </Typography>
                <Slider
                  value={speechParams['humor'] === 'Serious' ? 0 : speechParams['humor'] === 'Balanced' ? 1 : 2}
                  onChange={handleHumorChange}
                  aria-labelledby="humor-slider"
                  valueLabelDisplay="off"
                  step={1}
                  marks={[
                    { value: 0, label: 'Serious' },
                    { value: 1, label: 'Balanced' },
                    { value: 2, label: 'Humorous' }
                  ]}
                  min={0}
                  max={2}
                  sx={{ mb: 2 }}
                />
              </Box>
            </Grid>

            {/* Rhetorical Devices */}
            <Grid item xs={12}>
              <Box mb={1} mt={2}>
                <Typography variant="body2" color="textSecondary">
                  Select rhetorical devices to include in your speech. These will enhance persuasiveness and memorability.
                </Typography>
              </Box>
              <MultiSelectDropdown
                id="rhetorical-devices"
                label="Rhetorical Devices"
                value={speechParams['rhetorical-devices']}
                onChange={handleMultiSelectChange}
                options={RHETORICAL_DEVICES_OPTIONS}
                helperText="Select all rhetorical devices you would like to include"
              />
            </Grid>

            {/* Speech Length */}
            <Grid item xs={12}>
              <Box mb={1} mt={2}>
                <Typography variant="body2" color="textSecondary">
                  Specify the approximate desired length of your speech (in words, minutes, or pages).
                </Typography>
              </Box>
              <Alert severity="info" sx={{ mb: 1 }}>
                Note: The actual speech length depends on your input data. If limited information is provided about the candidate, audience, or topics, the generator may not reach your specified length target. Speech length is primarily an accommodation factor rather than an expansion factor.
              </Alert>
              <TextField
                id="speech-length"
                label="Speech Length"
                value={speechParams['speech-length']}
                onChange={handleSpeechParamChange('speech-length')}
                placeholder="e.g., 1500-2000 words, 15-20 minutes, 5-7 pages"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Contextual Factors Subsection */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Contextual Factors
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Provide information about the context in which the speech will be delivered.
          </Typography>

          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Context Matters:</strong> Adding current political climate and recent events makes your speech timely and relevant. The AI will use this information to reference appropriate events and tailor the speech to the current political landscape. Even brief contextual information can substantially improve speech quality.
            </Typography>
          </Alert>

          <Grid container spacing={2}>
            {/* Current Political Climate */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Describe the current political landscape and climate that might influence the speech.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="political-climate"
                label="Current Political Climate"
                value={speechParams['political-climate']}
                onChange={handleSpeechParamChange('political-climate')}
                placeholder="e.g., Polarized electorate, Recent government controversies, Rising economic concerns..."
                promptPlaceholder="Analyze the current political climate as it relates to this speech context..."
                rows={2}
                contextInfo="The current political climate describes the prevailing political conditions, public sentiment, and key issues that form the backdrop for your speech. This helps tailor content to current realities."
                systemPrompt="You are a political analyst specializing in current affairs. Provide a concise assessment of the current political climate that would be relevant to this speech. Focus on major trends, voter sentiments, and contextual factors that should influence the speech's messaging and tone."
              />
            </Grid>

            {/* Recent Events */}
            <Grid item xs={12}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Mention any recent events or developments that should be referenced in the speech.
                </Typography>
              </Box>
              <AISuggestionTextBox
                id="recent-events"
                label="Recent Events"
                value={speechParams['recent-events']}
                onChange={handleSpeechParamChange('recent-events')}
                placeholder="e.g., Recent policy announcement, Natural disaster, International event..."
                promptPlaceholder="Identify specific recent events that would be important to reference in this speech..."
                rows={2}
                contextInfo="Recent events are specific occurrences that should be addressed in your speech to make it timely and relevant. These can include legislation, news events, or local developments."
                systemPrompt="You are a political communications advisor tracking current events. Suggest specific recent events or developments that would be important to reference in this speech. Include a mix of political, economic, social, or local events that would resonate with the target audience and connect to the speech's themes."
              />
            </Grid>

            {/* Campaign Stage */}
            <Grid item xs={12} md={6}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Select the current stage of the campaign, which will influence the tone and urgency of the speech.
                </Typography>
              </Box>
              <FormControl fullWidth margin="normal">
                <InputLabel id="campaign-stage-label">Campaign Stage</InputLabel>
                <Select
                  labelId="campaign-stage-label"
                  id="campaign-stage"
                  value={speechParams['campaign-stage']}
                  label="Campaign Stage"
                  onChange={handleSpeechParamChange('campaign-stage')}
                >
                  {CAMPAIGN_STAGE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Geographic Location */}
            <Grid item xs={12} md={6}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Specify the location where the speech will be delivered to incorporate local references.
                </Typography>
              </Box>
              <TextField
                id="geographic-location"
                label="Geographic Location"
                value={speechParams['geographic-location']}
                onChange={handleSpeechParamChange('geographic-location')}
                placeholder="e.g., New Delhi, Mumbai, Rural Village in Punjab..."
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />
        
        {/* Persuasion Techniques Section
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Persuasion Techniques
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Select and customize persuasion techniques to make your speech more effective.
          </Typography>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Why This Matters:</strong> Persuasion techniques can significantly increase the impact of your speech. Choose techniques that align with your audience's values and concerns for maximum effectiveness. The AI can suggest techniques based on your candidate and audience profiles.
            </Typography>
          </Alert>

          <PersuasionTechniqueSelector
            candidateForm={candidateForm || {}}
            speechParams={speechParams || {}}
            value={speechParams?.['persuasion-techniques'] || []}
            onChange={handlePersuasionTechniquesChange}
            persuasionInstructions={speechParams?.['persuasion-instructions'] || ''}
            onPersuasionInstructionsChange={handlePersuasionInstructionsChange}
          />
        </Box>

        <Divider sx={{ mb: 3 }} /> */}
        
        <Box sx={{ mt: 4 }}>
          <Box mb={2}>
            <Typography variant="body2" color="textSecondary">
              Ready to generate your speech? The speech will be created based on the candidate profile and speech parameters you provided.
              When you click the button below, our AI will generate a custom political speech tailored to your specifications.
            </Typography>
          </Box>
          
          {/* Add RAG toggle checkbox and Test Speech checkbox */}
          <Box mb={2} display="flex" justifyContent="center" alignItems="center" gap={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableRAG}
                  onChange={(e) => setEnableRAG(e.target.checked)}
                />
              }
              label="Enable RAG (Retrieval-Augmented Generation)"
            />
            <Tooltip title="When enabled, the system will search for relevant information about the candidate and political party to enhance the speech generation with real-world facts and context. This makes speeches more factually accurate and current. Recommended for most cases.">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={useTestSpeech}
                  onChange={(e) => setUseTestSpeech(e.target.checked)}
                />
              }
              label="Use Test Speech"
            />
            <Tooltip title="When enabled, a pre-defined test speech will be returned instead of generating a new one. Useful for testing when the backend is not available.">
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>What Happens Next:</strong> When you click "Generate Speech," our AI will create a customized speech based on your inputs. Generation typically takes 60-120 seconds. Once complete, you'll be able to view, edit, analyze, translate, and download your speech in various formats.
            </Typography>
          </Alert>
          
          <Box display="flex" justifyContent="center">
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />} 
              onClick={handleGenerateSpeech}
              size="large"
              disabled={loading || !candidateProfile || !speechParams['speech-type']}
            >
              {loading ? 'Generating...' : 'Generate Speech'}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={promptLoading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
              onClick={handleDownloadPrompt}
              size="large"
              disabled={promptLoading || !candidateProfile || !speechParams['speech-type']}
              sx={{ ml: 2 }}
            >
              {promptLoading ? 'Downloading...' : 'Download Prompt'}
            </Button>
          </Box>
        </Box>

        {error && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {speech && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Generated Speech
            </Typography>
            <Box mb={2}>
              <Typography variant="body2" color="textSecondary">
                Here's your personalized political speech. You can copy this text and use it for your campaign.
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {/* Speech Display */}
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    backgroundColor: '#f9f9f9',
                    borderLeft: '4px solid #1976d2',
                    maxHeight: '500px',
                    overflow: 'auto',
                  }}
                >
                  <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-line' }}>
                    {speechResponse.speech}
                  </Typography>
                  
                  {/* Add Edit and Analyse Speech Buttons */}
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={handleEditSpeech}
                    >
                      Edit Speech
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<AssessmentIcon />}
                      onClick={handleAnalyseSpeech}
                    >
                      Analyse Speech
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      startIcon={<TranslateIcon />}
                      onClick={handleTranslateSpeech}
                    >
                      Translate Speech
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              
              {/* Speech Metadata */}
              <Grid item xs={12} md={4}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Key Themes
                    </Typography>
                    {speechResponse.key_themes && speechResponse.key_themes.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {speechResponse.key_themes.map((theme, index) => (
                          <Chip 
                            key={index} 
                            label={theme} 
                            color="primary" 
                            variant="outlined" 
                            size="small"
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No key themes available
                      </Typography>
                    )}
                  </CardContent>
                </Card>
                
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Sentiment Analysis
                    </Typography>
                    {speechResponse.sentiment && speechResponse.sentiment.category ? (
                      <>
                        <Typography variant="subtitle2">
                          Category: {speechResponse.sentiment.category}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {speechResponse.sentiment.explanation}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No sentiment data available
                      </Typography>
                    )}
                  </CardContent>
                </Card>
                
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Download Options
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<TextFileIcon />} 
                    onClick={downloadSpeechAsText}
                    fullWidth
                  >
                    Download as Text
                  </Button>
                  <Tooltip title="Download a formatted PDF with the speech text and metadata">
                    <Button 
                      variant="outlined" 
                      startIcon={<PdfIcon />} 
                      onClick={downloadSpeechAsPDF}
                      fullWidth
                    >
                      Download as PDF
                    </Button>
                  </Tooltip>
                  <Tooltip title="Download a formatted PDF with the speech text and metadata">
                    <Button 
                      variant="outlined" 
                      startIcon={<TextFileIcon />} 
                      onClick={downloadSpeechAsDoc}
                      fullWidth
                    >
                      Download as DOC
                    </Button>
                  </Tooltip>
                  <Button 
                    variant="outlined" 
                    startIcon={<JsonIcon />} 
                    onClick={downloadResponseAsJSON}
                    fullWidth
                  >
                    Download as JSON
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default SpeechForm; 