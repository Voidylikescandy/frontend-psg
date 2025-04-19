import React, { useState, useRef, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Divider,
  Grid,
  Alert,
  Card,
  Chip,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Tooltip,
  Stack
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RefreshIcon from '@mui/icons-material/Refresh';
import TranslateIcon from '@mui/icons-material/Translate';
import TextFileIcon from '@mui/icons-material/Description';
import JsonIcon from '@mui/icons-material/Code';
import { TRANSLATION_LANGUAGE_OPTIONS } from '../utils/constants';
import { translateSpeech } from '../utils/api';

const SpeechTranslate = () => {
  const [speechData, setSpeechData] = useState({
    speech: '',
    key_themes: [],
    sentiment: { category: '', explanation: '' }
  });
  const [originalSpeech, setOriginalSpeech] = useState('');
  const [translatedSpeech, setTranslatedSpeech] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const fileInputRef = useRef(null);

  // Load speech data from sessionStorage on component mount
  useEffect(() => {
    const savedSpeechData = sessionStorage.getItem('translateSpeechData');
    if (savedSpeechData) {
      try {
        const parsedData = JSON.parse(savedSpeechData);
        if (parsedData && parsedData.speech) {
          setSpeechData(parsedData);
          setOriginalSpeech(parsedData.speech);
          // Clear the data from sessionStorage to avoid unexpected loads on refresh
          sessionStorage.removeItem('translateSpeechData');
        }
      } catch (err) {
        console.error('Failed to parse saved speech data:', err);
      }
    }
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if the file is JSON
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Please upload a JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target.result);
        
        // Validate that the JSON has the expected structure
        if (!parsedData.speech) {
          setError('Invalid JSON format: missing speech content');
          return;
        }
        
        setSpeechData({
          speech: parsedData.speech || '',
          key_themes: parsedData.key_themes || [],
          sentiment: parsedData.sentiment || { category: '', explanation: '' }
        });
        setOriginalSpeech(parsedData.speech || '');
        // Reset translation data
        setTranslatedSpeech('');
        setCurrentLanguage('');
        setTargetLanguage('');
        setError('');
      } catch (err) {
        setError('Failed to parse JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle language selection
  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  // Reset all speech data
  const handleReset = () => {
    setSpeechData({
      speech: '',
      key_themes: [],
      sentiment: { category: '', explanation: '' }
    });
    setOriginalSpeech('');
    setTranslatedSpeech('');
    setCurrentLanguage('');
    setTargetLanguage('');
    setError('');
  };

  // Translate speech
  const handleTranslate = async () => {
    if (!originalSpeech) {
      setError('No speech content to translate');
      return;
    }

    if (!targetLanguage) {
      setError('Please select a target language');
      return;
    }

    // If target language is the same as current language, no need to translate
    if (targetLanguage === currentLanguage) {
      setSnackbarMessage('Speech is already translated to this language');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Use the original English speech for translation
      const sourceText = originalSpeech;
      
      // If English is selected, restore the original speech
      if (targetLanguage === 'en') {
        setTranslatedSpeech('');
        setCurrentLanguage('en');
        setSnackbarMessage('Restored original English version');
        setSnackbarOpen(true);
      } else {
        // Call translation API
        const translatedText = await translateSpeech(sourceText, targetLanguage);
        
        // Update translated speech
        setTranslatedSpeech(translatedText);
        setCurrentLanguage(targetLanguage);
        
        setSnackbarMessage(`Speech translated to ${TRANSLATION_LANGUAGE_OPTIONS.find(opt => opt.value === targetLanguage)?.label || targetLanguage}`);
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error('Translation error:', err);
      setError(err.message || 'Failed to translate speech');
    } finally {
      setLoading(false);
    }
  };

  // Download original speech as text file
  const downloadSpeechAsText = () => {
    if (!speechData.speech) return;
    
    const textToDownload = translatedSpeech || speechData.speech;
    const languageIndicator = translatedSpeech ? `_${currentLanguage}` : '';
    
    const element = document.createElement('a');
    const file = new Blob([textToDownload], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `speech${languageIndicator}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download speech as DOC
  const downloadSpeechAsDoc = () => {
    if (!speechData.speech) return;
    
    const textToDownload = translatedSpeech || speechData.speech;
    const languageIndicator = translatedSpeech ? `_${currentLanguage}` : '';
    
    const element = document.createElement('a');
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'></head><body>`;
    const footer = `</body></html>`;
    const html = header + textToDownload.replace(/\n/g, '<br>') + footer;
  
    const file = new Blob([html], { type: 'application/msword' });
    element.href = URL.createObjectURL(file);
    element.download = `speech${languageIndicator}_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download translated speech as JSON
  const downloadSpeechAsJSON = () => {
    if (!speechData.speech) return;
    
    const dataToDownload = {
      ...speechData
    };
    
    // If there's a translation, include it
    if (translatedSpeech) {
      dataToDownload.translation = {
        language: currentLanguage,
        languageName: TRANSLATION_LANGUAGE_OPTIONS.find(opt => opt.value === currentLanguage)?.label || currentLanguage,
        text: translatedSpeech
      };
    }
    
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(dataToDownload, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `speech_data${translatedSpeech ? `_${currentLanguage}` : ''}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Language name helper
  const getLanguageName = (code) => {
    if (code === 'en') return 'English (Original)';
    return TRANSLATION_LANGUAGE_OPTIONS.find(opt => opt.value === code)?.label || code;
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Speech Translation
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        View and translate your speech to different languages or upload a previously saved speech JSON file.
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Upload Button and Reset Button */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <input
          type="file"
          accept=".json,application/json"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Button
          variant="outlined"
          color="primary"
          startIcon={<UploadFileIcon />}
          onClick={handleUploadClick}
        >
          Upload Speech JSON
        </Button>
        
        <Button
          variant="outlined"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={handleReset}
        >
          Reset All
        </Button>
      </Box>
      
      {error && (
        <Box sx={{ mt: 2, mb: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Original Speech Content */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Original Speech Text (English)
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={15}
          variant="outlined"
          value={originalSpeech}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#f9f9f9',
            }
          }}
        />
      </Box>
      
      {/* Key Themes */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Key Themes
        </Typography>
        <Card sx={{ mb: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {speechData.key_themes.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {speechData.key_themes.map((theme, index) => (
                    <Chip 
                      key={index} 
                      label={theme} 
                      color="primary" 
                      variant="outlined"
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  No key themes available.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Card>
      </Box>
      
      {/* Sentiment Analysis */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sentiment Analysis
        </Typography>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Sentiment Category"
                value={speechData.sentiment?.category || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Sentiment Explanation"
                value={speechData.sentiment?.explanation || ''}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Translation Controls */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Speech Translation
        </Typography>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="target-language-label">Target Language</InputLabel>
                <Select
                  labelId="target-language-label"
                  id="target-language"
                  value={targetLanguage}
                  label="Target Language"
                  onChange={handleLanguageChange}
                  disabled={!speechData.speech}
                >
                  <MenuItem value="en">English (Original)</MenuItem>
                  {TRANSLATION_LANGUAGE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <TranslateIcon />}
                onClick={handleTranslate}
                disabled={loading || !originalSpeech || !targetLanguage || targetLanguage === currentLanguage}
              >
                {loading ? 'Translating...' : 'Translate Speech'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {currentLanguage && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Current translation: <strong>{getLanguageName(currentLanguage)}</strong>
                </Alert>
              )}
            </Grid>
          </Grid>
        </Card>
      </Box>
      
      {/* Translated Speech */}
      {translatedSpeech && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Translated Speech ({getLanguageName(currentLanguage)})
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={15}
            variant="outlined"
            value={translatedSpeech}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f5f5f5',
                borderLeft: '4px solid #9c27b0',
              }
            }}
          />
        </Box>
      )}
      
      {/* Download Options */}
      {speechData.speech && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined" 
              startIcon={<TextFileIcon />} 
              onClick={downloadSpeechAsText}
            >
              Download as Text
            </Button>
            <Tooltip title="Download a formatted DOC with the speech text">
              <Button 
                variant="outlined" 
                startIcon={<TextFileIcon />} 
                onClick={downloadSpeechAsDoc}
              >
                Download as Doc
              </Button>
            </Tooltip>
            <Button 
              variant="outlined" 
              startIcon={<JsonIcon />} 
              onClick={downloadSpeechAsJSON}
            >
              Download as JSON
            </Button>
          </Stack>
        </Box>
      )}
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Paper>
  );
};

export default SpeechTranslate; 