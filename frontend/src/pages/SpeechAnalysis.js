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
  TextField
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RefreshIcon from '@mui/icons-material/Refresh';

const SpeechAnalysis = () => {
  const [speechData, setSpeechData] = useState({
    speech: '',
    key_themes: [],
    sentiment: { category: '', explanation: '' }
  });
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Load speech data from sessionStorage on component mount
  useEffect(() => {
    const savedSpeechData = sessionStorage.getItem('analysisSpeechData');
    if (savedSpeechData) {
      try {
        const parsedData = JSON.parse(savedSpeechData);
        if (parsedData && parsedData.speech) {
          setSpeechData(parsedData);
          // Clear the data from sessionStorage to avoid unexpected loads on refresh
          sessionStorage.removeItem('analysisSpeechData');
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

  // Reset all speech data
  const handleReset = () => {
    setSpeechData({
      speech: '',
      key_themes: [],
      sentiment: { category: '', explanation: '' }
    });
    setError('');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Speech Analysis
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        View a detailed analysis of your speech or upload a previously saved speech JSON file.
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Upload Button, Reset Button and Error Display */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
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
        
        {error && (
          <Box sx={{ mt: 2, flexGrow: 1 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Box>

      {/* Speech Text - Read-only */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Speech Text
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={15}
          variant="outlined"
          value={speechData.speech}
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
      
      {/* Key Themes - Read-only */}
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
      
      {/* Sentiment Analysis - Read-only */}
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
    </Paper>
  );
};

export default SpeechAnalysis; 