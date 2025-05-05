import React, { useState, useRef } from 'react';
import { 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Card,
  CardContent,
  Grid,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MultiSelectDropdown from './MultiSelectDropdown';
import AISuggestionTextBox from './AISuggestionTextBox';
import { GROQ_API_KEY, PERSUASION_TECHNIQUE_OPTIONS } from '../../utils/constants';

const PersuasionTechniqueSelector = ({
  candidateForm,
  speechParams,
  value = [],
  onChange,
  persuasionInstructions,
  onPersuasionInstructionsChange
}) => {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedTechniques, setSuggestedTechniques] = useState([]);
  const abortControllerRef = useRef(null);

  const safeValue = Array.isArray(value) ? value : [];

  const handleOpenDialog = () => {
    setOpen(true);
    setSuggestedTechniques([]);
    setIsGenerating(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    // If generation is in progress, abort it
    if (isGenerating && abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const handleSelectTechnique = (technique) => {
    // Add the selected technique to the current selection if not already present
    if (!safeValue.includes(technique.value)) {
      const updatedTechniques = [...safeValue, technique.value];
      const event = {
        target: {
          value: updatedTechniques
        }
      };
      onChange(event);
    }
    
    // Close the dialog
    handleCloseDialog();
  };

  const generateSuggestedTechniques = async () => {
    setIsGenerating(true);
    
    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // Prepare the data for the AI analysis with null/undefined checks
      const data = {
        candidateProfile: {
          name: candidateForm?.['candidate-name'] || '',
          party: candidateForm?.['political-party'] === 'other' 
            ? candidateForm?.['other-party'] || '' 
            : candidateForm?.['political-party'] || '',
          officeSought: candidateForm?.['office-sought'] || '',
          bio: candidateForm?.['brief-bio'] || '',
          keyStrengths: candidateForm?.['key-strengths'] || []
        },
        audienceProfile: {
          ageRange: candidateForm?.['age-range'] || [],
          education: candidateForm?.['education-level'] || '',
          socioeconomic: candidateForm?.['socioeconomic-status'] || '',
          cultural: candidateForm?.['cultural-background'] || '',
          politicalAffiliation: candidateForm?.['political-affiliation-type'] 
            ? `${candidateForm?.['political-affiliation-strength'] || ''} ${candidateForm?.['political-affiliation-type']}` 
            : '',
          primaryConcerns: candidateForm?.['primary-concerns'] || '',
          existingValues: candidateForm?.['existing-values'] || '',
          occupation: candidateForm?.['occupation'] || '',
          interests: candidateForm?.['interests'] || ''
        },
        campaignMessage: {
          slogan: speechParams?.['slogan'] || '',
          mainMessage: speechParams?.['main-message'] || '',
          policyPoints: Array.isArray(speechParams?.['policy-points']) 
            ? speechParams?.['policy-points'] 
            : []
        }
      };

      // Log the data being sent to AI to verify all information is included
      console.log("SENDING TO AI - COMPLETE DATA:", {
        candidateProfile: data.candidateProfile,
        audienceProfile: data.audienceProfile,
        campaignMessage: data.campaignMessage
      });

      // System prompt for persuasion technique suggestions
      const systemPrompt = `
        You are an expert political strategist specializing in persuasion techniques. Your task is to analyze the candidate profile, audience profile, 
        and campaign message to suggest the most effective persuasion techniques.
        
        Here are the key persuasion techniques you can recommend:
        
        1. Sustain Their Compliance: Maintaining existing support by reinforcing decisions already made.
        2. Drive Their Momentum: Creating a sense of movement toward a larger goal.
        3. Optimize Your Message: Framing issues in terms of values that resonate with the audience.
        4. Habituate Your Message: Strategic repetition of key messages to build familiarity.
        5. Trigger Social Pressure: Utilizing social proof to influence behavior.
        6. Elicit Congruent Attitudes: Guiding the audience to generate their own arguments in favor of your position.
        
        Analyze the provided information and suggest the 2-3 most relevant techniques for this specific situation. Provide a brief
        explanation for each suggestion that is tailored to the specific candidate, audience, and message.
        
        Your response must be in JSON format with the following structure:
        {
          "PersuasionTechnique1": "Name of first technique",
          "Explanation1": "Explanation of why this technique is effective for this specific candidate/audience/message",
          "PersuasionTechnique2": "Name of second technique",
          "Explanation2": "Explanation of why this technique is effective for this specific candidate/audience/message"
        }
        
        You may include additional techniques if highly relevant.
      `;

      // Call GROQ API for analysis
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: JSON.stringify(data) }
          ],
          temperature: 0.7,
          max_tokens: 800,
          response_format: { type: "json_object" }
        }),
        signal,
      });

      const responseData = await response.json();
      const content = responseData.choices[0]?.message?.content;
      
      console.log("AI response for persuasion techniques:", content);
      
      if (content) {
        try {
          const parsedTechniques = JSON.parse(content);
          const techniques = [];
          
          // Process the response to extract techniques
          let index = 1;
          while (parsedTechniques[`PersuasionTechnique${index}`] && parsedTechniques[`Explanation${index}`]) {
            const techniqueName = parsedTechniques[`PersuasionTechnique${index}`];
            const explanation = parsedTechniques[`Explanation${index}`];
            
            // Match the technique name to our predefined options
            const matchedTechnique = PERSUASION_TECHNIQUE_OPTIONS.find(
              option => option.label.toLowerCase() === techniqueName.toLowerCase()
            );
            
            if (matchedTechnique) {
              techniques.push({
                ...matchedTechnique,
                explanation: explanation // Use the AI-generated explanation
              });
            } else {
              // If no exact match, create a custom technique
              techniques.push({
                value: `custom-${index}`,
                label: techniqueName,
                explanation: explanation
              });
            }
            
            index++;
          }
          
          setSuggestedTechniques(techniques);
        } catch (e) {
          console.error('Error parsing AI response:', e);
          setSuggestedTechniques([]);
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error generating suggestions:', error);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Persuasion Techniques
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Select persuasion techniques to enhance the effectiveness of your speech.
        </Typography>
        
        <Box display="flex" justifyContent="center" mb={2}>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<AutoAwesomeIcon />} 
            onClick={handleOpenDialog}
          >
            Suggest Techniques
          </Button>
        </Box>
        
        <MultiSelectDropdown
          id="persuasion-techniques"
          label="Persuasion Techniques"
          value={safeValue}
          onChange={onChange}
          options={PERSUASION_TECHNIQUE_OPTIONS}
          helperText="Select the persuasion techniques to use in your speech"
        />
        
        {safeValue.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Techniques:
            </Typography>
            <Grid container spacing={2}>
              {safeValue.map(techniqueValue => {
                const technique = PERSUASION_TECHNIQUE_OPTIONS.find(option => option.value === techniqueValue);
                return technique ? (
                  <Grid item xs={12} key={technique.value}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          {technique.label}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {technique.explanation}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : null;
              })}
            </Grid>
          </Box>
        )}
        
        <Box mt={3}>
          <Typography variant="subtitle2" gutterBottom>
            Additional Persuasion Instructions
          </Typography>
          <AISuggestionTextBox
            id="persuasion-instructions"
            label="Specific Persuasion Instructions"
            value={persuasionInstructions}
            onChange={onPersuasionInstructionsChange}
            placeholder="Enter specific instructions on how to implement persuasion techniques in the speech..."
            promptPlaceholder="Provide detailed instructions on how to implement these persuasion techniques for this specific audience and candidate..."
            rows={3}
            contextInfo={`
              Candidate: ${candidateForm?.['candidate-name'] || ''} (${candidateForm?.['political-party'] === 'other' ? candidateForm?.['other-party'] : candidateForm?.['political-party'] || ''}), 
              Office: ${candidateForm?.['office-sought'] || ''}, 
              Key strengths: ${Array.isArray(candidateForm?.['key-strengths']) ? candidateForm?.['key-strengths'].join(', ') : ''}, 
              Audience: ${candidateForm?.['cultural-background'] || ''}, 
              Age range: ${Array.isArray(candidateForm?.['age-range']) ? `${candidateForm?.['age-range'][0]} - ${candidateForm?.['age-range'][1]}` : ''},
              Education: ${candidateForm?.['education-level'] || ''},
              Occupation: ${candidateForm?.['occupation'] || ''},
              Interests: ${candidateForm?.['interests'] || ''},
              Socioeconomic: ${candidateForm?.['socioeconomic-status'] || ''},
              Political views: ${candidateForm?.['political-affiliation-strength'] || ''} ${candidateForm?.['political-affiliation-type'] || ''},
              Primary concerns: ${candidateForm?.['primary-concerns'] || ''},
              Values: ${candidateForm?.['existing-values'] || ''},
              Slogan: ${speechParams?.['slogan'] || ''},
              Core message: ${speechParams?.['main-message'] || ''}, 
              Policy points: ${Array.isArray(speechParams?.['policy-points']) ? speechParams?.['policy-points'].join('; ') : ''},
              Selected persuasion techniques: ${safeValue.map(v => {
                const technique = PERSUASION_TECHNIQUE_OPTIONS.find(opt => opt.value === v);
                return technique ? technique.label : v;
              }).join(', ')}
            `}
            systemPrompt="You are a political persuasion expert. Based on the detailed candidate profile, audience characteristics, campaign messages, policy points, and selected persuasion techniques, provide specific instructions on how to effectively implement these techniques in the speech. Explain exactly how to adapt the message to the audience's values, concerns and background. Focus on practical, actionable guidance tailored to this specific political context. Include examples of language, framing, and messaging that would be most effective."
          />
        </Box>
      </Box>
      
      <Dialog 
        open={open} 
        onClose={handleCloseDialog} 
        fullWidth 
        maxWidth="md"
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Suggested Persuasion Techniques</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {isGenerating ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
                Analyzing candidate profile and audience data...
              </Typography>
            </Box>
          ) : suggestedTechniques.length > 0 ? (
            <Box>
              <Typography variant="body2" paragraph>
                Based on the candidate profile, audience information, and campaign message, the following persuasion techniques are recommended:
              </Typography>
              
              {suggestedTechniques.map((technique, index) => (
                <Paper key={index} elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        {technique.label}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {technique.explanation}
                      </Typography>
                    </Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={safeValue.includes(technique.value)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            let updatedTechniques;
                            
                            if (isChecked && !safeValue.includes(technique.value)) {
                              updatedTechniques = [...safeValue, technique.value];
                            } else if (!isChecked && safeValue.includes(technique.value)) {
                              updatedTechniques = safeValue.filter(t => t !== technique.value);
                            } else {
                              updatedTechniques = [...safeValue];
                            }
                            
                            onChange({
                              target: {
                                value: updatedTechniques
                              }
                            });
                          }}
                        />
                      }
                      label="Select"
                    />
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="300px">
              <Typography variant="body1" paragraph>
                Click the button below to analyze the candidate profile and audience information to suggest effective persuasion techniques.
              </Typography>
              
              <Box mt={2} mb={4} width="100%" maxWidth="600px" mx="auto">
                <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa', borderLeft: '4px solid #1976d2' }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#1976d2', mb: 1 }}>
                    <span role="img" aria-label="profile">👤</span> Candidate Profile
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ ml: 3 }}>
                    <strong>Name:</strong> {candidateForm?.['candidate-name'] || 'Not specified'}<br />
                    <strong>Party:</strong> {candidateForm?.['political-party'] === 'other' 
                      ? candidateForm?.['other-party'] || 'Not specified' 
                      : candidateForm?.['political-party'] || 'Not specified'}<br />
                    <strong>Office:</strong> {candidateForm?.['office-sought'] || 'Not specified'}<br />
                    <strong>Key Strengths:</strong> {Array.isArray(candidateForm?.['key-strengths']) 
                      ? candidateForm?.['key-strengths'].join(', ') 
                      : candidateForm?.['key-strengths'] || 'Not specified'}
                  </Typography>
                </Paper>
                
                <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa', borderLeft: '4px solid #4caf50' }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#4caf50', mb: 1 }}>
                    <span role="img" aria-label="audience">👥</span> Audience Profile
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ ml: 3 }}>
                    <strong>Age Range:</strong> {Array.isArray(candidateForm?.['age-range']) 
                      ? `${candidateForm?.['age-range'][0]} - ${candidateForm?.['age-range'][1]}` 
                      : 'Not specified'}<br />
                    <strong>Education:</strong> {candidateForm?.['education-level'] || 'Not specified'}<br />
                    <strong>Occupation:</strong> {candidateForm?.['occupation'] || 'Not specified'}<br />
                    <strong>Socioeconomic:</strong> {candidateForm?.['socioeconomic-status'] || 'Not specified'}<br />
                    <strong>Cultural Background:</strong> {candidateForm?.['cultural-background'] || 'Not specified'}<br />
                    <strong>Political Views:</strong> {candidateForm?.['political-affiliation-strength'] && candidateForm?.['political-affiliation-type'] 
                      ? `${candidateForm?.['political-affiliation-strength']} ${candidateForm?.['political-affiliation-type']}` 
                      : 'Not specified'}<br />
                    <strong>Primary Concerns:</strong> {candidateForm?.['primary-concerns'] || 'Not specified'}<br />
                  </Typography>
                </Paper>
                
                <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa', borderLeft: '4px solid #9c27b0' }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#9c27b0', mb: 1 }}>
                    <span role="img" aria-label="campaign">📣</span> Campaign Core Message
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ ml: 3 }}>
                    <strong>Slogan:</strong> {speechParams?.['slogan'] || 'Not specified'}<br />
                    <strong>Main Message:</strong> {speechParams?.['main-message'] || 'Not specified'}<br />
                    <strong>Policy Points:</strong> {Array.isArray(speechParams?.['policy-points']) && speechParams?.['policy-points'].length > 0
                      ? <ul style={{marginTop: 4, marginBottom: 4}}>
                          {speechParams?.['policy-points'].map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      : 'Not specified'}
                  </Typography>
                </Paper>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary"
                onClick={generateSuggestedTechniques}
                startIcon={<AutoAwesomeIcon />}
              >
                Generate Suggestions
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PersuasionTechniqueSelector; 