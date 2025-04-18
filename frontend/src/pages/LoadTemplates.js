// src/pages/LoadTemplates.js
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  CardMedia, 
  Grid, 
  Button, 
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TEST_TEMPLATES, validateTemplate, templateToFormData } from '../utils/templates';
import DescriptionIcon from '@mui/icons-material/Description';
import './LoadTemplates.css';

const LoadTemplates = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [imageErrors, setImageErrors] = useState({});

  // Handle template selection
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setOpenDialog(true);
    
    // Validate the template
    const validation = validateTemplate(template.template);
    setValidationErrors(validation.errors);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTemplate(null);
    setValidationErrors([]);
  };

  // Handle image load error
  const handleImageError = (templateId) => {
    setImageErrors(prev => ({
      ...prev,
      [templateId]: true
    }));
  };

  // Load the template and redirect to Speech Form
  const handleLoadTemplate = () => {
    if (!selectedTemplate) return;
    
    const validation = validateTemplate(selectedTemplate.template);
    
    if (!validation.isValid) {
      setSnackbarMessage('Template has validation errors and cannot be loaded.');
      setSnackbarOpen(true);
      return;
    }
    
    // Convert template to form data
    const { candidateForm, speechParams } = templateToFormData(selectedTemplate.template);
    
    // Save data to session storage
    sessionStorage.setItem('filledCandidateProfile', JSON.stringify(candidateForm));
    sessionStorage.setItem('speechParameters', JSON.stringify(speechParams));
    
    // Generate and save the candidate profile in the format needed for speech generation
    const formattedCandidateProfile = {
      ...candidateForm,
      'political-affiliation': candidateForm['political-affiliation-type'] && candidateForm['political-affiliation-strength']
        ? `${candidateForm['political-affiliation-strength']} ${candidateForm['political-affiliation-type']}` 
        : '',
      'age-range': `${candidateForm['age-range'][0]} - ${candidateForm['age-range'][1]}`,
      'key-strengths': Array.isArray(candidateForm['key-strengths']) 
        ? candidateForm['key-strengths'].join(', ')
        : candidateForm['key-strengths'],
    };
    
    // Remove fields not needed in the formatted profile
    delete formattedCandidateProfile['political-affiliation-type'];
    delete formattedCandidateProfile['political-affiliation-strength'];
    
    // Save the formatted profile
    sessionStorage.setItem('candidateProfile', JSON.stringify(formattedCandidateProfile));
    
    // Show success message
    setSnackbarMessage('Template loaded successfully! Redirecting to Speech Form...');
    setSnackbarOpen(true);
    
    // Close dialog and redirect
    setOpenDialog(false);
    
    // Redirect after a short delay to show the success message
    setTimeout(() => {
      navigate('/speech-form');
    }, 1000);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Load Template
      </Typography>
      <Typography variant="body1" paragraph>
        Select a template to quickly create a speech with pre-configured settings.
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {TEST_TEMPLATES.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card className="template-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {imageErrors[template.id] ? (
                <Box className={`default-template-image template-image-${template.template["speech-type"] || 'campaign-announcement'}`}>
                  <DescriptionIcon sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body1" sx={{ px: 2 }}>
                    {template.name}
                  </Typography>
                </Box>
              ) : (
                <CardMedia
                  component="img"
                  height="140"
                  image={`/templates/${template.thumbnail}`}
                  alt={template.name}
                  onError={() => handleImageError(template.id)}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {template.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
                </Typography>
                <Box mt={2}>
                  <Typography variant="body2" fontWeight="bold">
                    Candidate: {template.template["candidate-name"]}
                  </Typography>
                  <Typography variant="body2">
                    Party: {template.template["political-party"]}
                  </Typography>
                  <Typography variant="body2">
                    Speech Type: {template.template["speech-type"]}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  variant="contained" 
                  color="primary"
                  onClick={() => handleSelectTemplate(template)}
                  fullWidth
                >
                  Use Template
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Template Preview Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="template-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="template-dialog-title">
          {selectedTemplate?.name} Template
        </DialogTitle>
        <DialogContent className="template-dialog-content">
          {validationErrors.length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Template Validation Errors:</Typography>
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          
          <DialogContentText paragraph>
            This template will pre-fill the speech form with the following details:
          </DialogContentText>
          
          {selectedTemplate && (
            <Box sx={{ mt: 2 }}>
              <Box className="template-section">
                <Typography variant="h6">Candidate Profile</Typography>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Candidate:</strong> {selectedTemplate.template["candidate-name"]}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Party:</strong> {selectedTemplate.template["political-party"]}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Office:</strong> {selectedTemplate.template["office-sought"]}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Strengths:</strong> {selectedTemplate.template["key-strengths"]}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Bio:</strong> 
                      <span style={{ display: 'block', fontSize: '0.85rem', marginTop: '5px' }}>
                        {selectedTemplate.template["brief-bio"].substring(0, 150)}...
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box className="template-section">
                <Typography variant="h6">Audience Profile</Typography>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Age Range:</strong> {selectedTemplate.template["age-range"]}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Education:</strong> {selectedTemplate.template["education-level"]}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Occupation:</strong> {selectedTemplate.template["occupation"]}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Political Affiliation:</strong> {selectedTemplate.template["political-affiliation"]} ({selectedTemplate.template["affiliation-strength"]})
                    </Typography>
                    <Typography variant="body2">
                      <strong>Primary Concerns:</strong> 
                      <span style={{ display: 'block', fontSize: '0.85rem', marginTop: '5px' }}>
                        {selectedTemplate.template["primary-concerns"]}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Box className="template-section">
                <Typography variant="h6">Speech Parameters</Typography>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Speech Type:</strong> {selectedTemplate.template["speech-type"]}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Slogan:</strong> "{selectedTemplate.template["slogan"]}"
                    </Typography>
                    <Typography variant="body2">
                      <strong>Call to Action:</strong> {selectedTemplate.template["call-to-action"]}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Tone:</strong> {selectedTemplate.template["speech-tone"]}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Formality:</strong> {selectedTemplate.template["formality"]}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Rhetorical Devices:</strong>
                    </Typography>
                    <Box mt={1}>
                      {selectedTemplate.template["rhetorical-devices"].split(',').map((device, index) => (
                        <span key={index} className="template-tag">
                          {device.trim()}
                        </span>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  <strong>Policy Points:</strong>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                  {selectedTemplate.template["policy-points"]}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleLoadTemplate} 
            variant="contained" 
            color="primary"
            disabled={validationErrors.length > 0}
          >
            Load Template
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default LoadTemplates;
