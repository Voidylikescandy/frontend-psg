import React, { useState, useRef, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Divider,
  TextField,
  Grid,
  Alert,
  Card,
  Chip,
  Tooltip,
  Stack
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TextFileIcon from '@mui/icons-material/Description';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import JsonIcon from '@mui/icons-material/Code';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { jsPDF } from 'jspdf';
import AIEditTextBox from '../components/forms/AIEditTextBox';

const SpeechEdit = () => {
  const [speechData, setSpeechData] = useState({
    speech: '',
    key_themes: [],
    sentiment: { category: '', explanation: '' }
  });
  const [error, setError] = useState('');
  const [newTheme, setNewTheme] = useState('');
  const fileInputRef = useRef(null);

  // Load speech data from sessionStorage on component mount
  useEffect(() => {
    const savedSpeechData = sessionStorage.getItem('editSpeechData');
    if (savedSpeechData) {
      try {
        const parsedData = JSON.parse(savedSpeechData);
        if (parsedData && parsedData.speech) {
          setSpeechData(parsedData);
          // Clear the data from sessionStorage to avoid unexpected loads on refresh
          sessionStorage.removeItem('editSpeechData');
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

  // Handle speech text changes
  const handleSpeechChange = (event) => {
    setSpeechData({
      ...speechData,
      speech: event.target.value
    });
  };
  
  // Handle sentiment category changes
  const handleSentimentCategoryChange = (event) => {
    setSpeechData({
      ...speechData,
      sentiment: {
        ...speechData.sentiment,
        category: event.target.value
      }
    });
  };
  
  // Handle sentiment explanation changes
  const handleSentimentExplanationChange = (event) => {
    setSpeechData({
      ...speechData,
      sentiment: {
        ...speechData.sentiment,
        explanation: event.target.value
      }
    });
  };
  
  // Handle key theme changes
  const handleAddTheme = () => {
    if (!newTheme.trim()) return;
    
    setSpeechData({
      ...speechData,
      key_themes: [...speechData.key_themes, newTheme.trim()]
    });
    setNewTheme('');
  };
  
  const handleDeleteTheme = (index) => {
    const updatedThemes = speechData.key_themes.filter((_, i) => i !== index);
    setSpeechData({
      ...speechData,
      key_themes: updatedThemes
    });
  };
  
  const handleNewThemeChange = (event) => {
    setNewTheme(event.target.value);
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Download the edited speech as a text file
  const downloadSpeechAsText = () => {
    if (!speechData.speech) return;
    
    const element = document.createElement('a');
    const file = new Blob([speechData.speech], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `edited_speech_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Download edited speech as a Doc file
  const downloadSpeechAsDoc = () => {
    if (!speechData.speech) return;
  
    const element = document.createElement('a');
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'></head><body>`;
    const footer = `</body></html>`;
    const html = header + speechData.speech.replace(/\n/g, '<br>') + footer;
  
    const file = new Blob([html], { type: 'application/msword' });
    element.href = URL.createObjectURL(file);
    element.download = `edited_speech_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  

  // Download the edited speech as a PDF file
  const downloadSpeechAsPDF = () => {
    if (!speechData.speech) return;
    
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set title
    const title = `Edited Political Speech (${new Date().toLocaleDateString()})`;
    doc.setFontSize(16);
    doc.text(title, 20, 20);
    
    // Add metadata
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    if (speechData.sentiment?.category) {
      doc.text(`Tone: ${speechData.sentiment.category}`, 20, 30);
    }
    
    // Add horizontal line
    doc.setDrawColor(220, 220, 220);
    doc.line(20, 35, 190, 35);
    
    // Set text options for the main content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    
    // Split the text into lines that fit the page width
    const lines = doc.splitTextToSize(speechData.speech, 175);
    
    // Define page dimensions and parameters for optimal text placement
    const startY = 40;
    const lineHeight = 5.5;
    const pageHeight = doc.internal.pageSize.height;
    const pageMarginBottom = 12;
    
    // Calculate usable page heights
    const usableFirstPageHeight = pageHeight - startY - pageMarginBottom;
    const usableOtherPagesHeight = pageHeight - 15 - pageMarginBottom;
    
    // Calculate how many lines can fit on each page type (using at least 95% of available space)
    const maxLinesOnFirstPage = Math.floor(usableFirstPageHeight / lineHeight);
    const maxLinesOnOtherPages = Math.floor(usableOtherPagesHeight / lineHeight);
    
    // Add text to the PDF with improved pagination
    let currentPage = 1;
    let currentLine = 0;
    let currentPosition = startY;
    
    while (currentLine < lines.length) {
      // Determine how many lines to put on this page
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
        currentPosition = 15;
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
    if (speechData.key_themes && speechData.key_themes.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Key Themes', 20, 20);
      
      doc.setFontSize(11);
      speechData.key_themes.forEach((theme, index) => {
        doc.text(`• ${theme}`, 20, 30 + (index * 8));
      });
      
      if (speechData.sentiment?.explanation) {
        doc.text('Sentiment Analysis', 20, 30 + (speechData.key_themes.length * 8) + 10);
        doc.setFontSize(10);
        const sentimentLines = doc.splitTextToSize(speechData.sentiment.explanation, 170);
        doc.text(sentimentLines, 20, 30 + (speechData.key_themes.length * 8) + 20);
      }
    }
    
    // Save the PDF
    doc.save(`edited_speech_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // Download the complete data as JSON
  const downloadDataAsJSON = () => {
    if (!speechData.speech) return;
    
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(speechData, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `edited_speech_data_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Reset all speech data
  const handleReset = () => {
    setSpeechData({
      speech: '',
      key_themes: [],
      sentiment: { category: '', explanation: '' }
    });
    setNewTheme('');
    setError('');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Speech
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Edit your generated speech or upload a previously saved speech JSON file.
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

      {/* Speech Editor - Full width with AI editing capability */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Speech Text
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Edit your speech in the textbox below. <strong>Select any text with your mouse to rewrite that section with AI assistance.</strong>
        </Typography>
        {/* This AIEditTextBox component already provides text highlighting and regeneration functionality.
            When users select text, a popup will appear with an option to rewrite the selected section. */}
        <AIEditTextBox
          value={speechData.speech}
          onChange={handleSpeechChange}
          placeholder="Your speech content will appear here..."
          rows={15}
        />
      </Box>
      
      {/* Key Themes - Full width and editable */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Key Themes
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Edit or add themes that represent the main topics of your speech.
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
                      onDelete={() => handleDeleteTheme(index)}
                      deleteIcon={<DeleteIcon />}
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  No key themes added yet. Add some below.
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField 
                fullWidth
                placeholder="Add a new theme..."
                value={newTheme}
                onChange={handleNewThemeChange}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTheme()}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddCircleIcon />}
                onClick={handleAddTheme}
              >
                Add Theme
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
      
      {/* Sentiment Analysis - Full width and editable */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sentiment Analysis
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Edit the sentiment category and explanation for your speech.
        </Typography>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Sentiment Category"
                placeholder="e.g., Inspirational, Cautionary, Optimistic..."
                value={speechData.sentiment?.category || ''}
                onChange={handleSentimentCategoryChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Sentiment Explanation"
                placeholder="Explain why this sentiment category applies to the speech..."
                value={speechData.sentiment?.explanation || ''}
                onChange={handleSentimentExplanationChange}
              />
            </Grid>
          </Grid>
        </Card>
      </Box>
      
      {/* Download Options - Centered */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={<TextFileIcon />} 
            onClick={downloadSpeechAsText}
            disabled={!speechData.speech}
          >
            Download as Text
          </Button>
          <Tooltip title="Download a formatted PDF with the speech text and metadata">
            <Button 
              variant="outlined" 
              startIcon={<PdfIcon />} 
              onClick={downloadSpeechAsPDF}
              disabled={!speechData.speech}
            >
              Download as PDF
            </Button>
          </Tooltip>
          <Tooltip title="Download a formatted DOC with the speech text and metadata">
            <Button 
              variant="outlined" 
              startIcon={<TextFileIcon />} 
              onClick={downloadSpeechAsDoc}
              disabled={!speechData.speech}
            >
              Download as Doc
            </Button>
          </Tooltip>
          <Button 
            variant="outlined" 
            startIcon={<JsonIcon />} 
            onClick={downloadDataAsJSON}
            disabled={!speechData.speech}
          >
            Download as JSON
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default SpeechEdit; 