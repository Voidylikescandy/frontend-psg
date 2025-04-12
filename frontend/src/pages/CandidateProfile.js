import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Divider,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextInput from '../components/forms/TextInput';
import TextAreaWithWordLimit from '../components/forms/TextAreaWithWordLimit';
import MultiSelectDropdown from '../components/forms/MultiSelectDropdown';
import AISuggestionTextBox from '../components/forms/AISuggestionTextBox';
import { 
  EXPERTISE_OPTIONS, 
  EDUCATION_LEVEL_OPTIONS,
  POLITICAL_AFFILIATION_OPTIONS,
  AFFILIATION_STRENGTH_OPTIONS,
  POLITICAL_PARTY_OPTIONS,
  CANDIDATES_BY_PARTY,
  CANDIDATE_OFFICE_MAPPING
} from '../utils/constants';

const CandidateProfile = () => {
  const navigate = useNavigate();

  // State for candidate profile form
  const [candidateForm, setCandidateForm] = useState({
    'candidate-name': '',
    'political-party': '',
    'other-party': '', // For custom party name when 'other' is selected
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
  });

  // Handle form field changes
  const handleChange = (field) => (event) => {
    setCandidateForm({
      ...candidateForm,
      [field]: event.target.value,
    });
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
    
    setCandidateForm({
      ...candidateForm,
      ...updates
    });
  };

  // Handle candidate name change
  const handleCandidateChange = (event) => {
    const selectedCandidate = event.target.value;
    
    // Update candidate name and set the office-sought based on mapping
    setCandidateForm({
      ...candidateForm,
      'candidate-name': selectedCandidate,
      'office-sought': CANDIDATE_OFFICE_MAPPING[selectedCandidate] || '',
    });
  };

  // Handle slider changes
  const handleSliderChange = (event, newValue) => {
    setCandidateForm({
      ...candidateForm,
      'age-range': newValue,
    });
  };

  // Handle multi-select dropdown changes
  const handleMultiSelectChange = (event) => {
    // Store the values
    setCandidateForm({
      ...candidateForm,
      'key-strengths': event.target.value,
    });
  };

  // Navigate to next page
  const handleNext = () => {
    // Create a new object with formatted values for submission
    const formattedForm = {
      ...candidateForm,
      // Only include the combined political affiliation
      'political-affiliation': candidateForm['political-affiliation-strength'] && candidateForm['political-affiliation-type']
        ? `${candidateForm['political-affiliation-strength']} ${candidateForm['political-affiliation-type']}` 
        : '',
      // Format age range as a string
      'age-range': `${candidateForm['age-range'][0]} - ${candidateForm['age-range'][1]}`,
      // Since we're using the same value as label, no need for special formatting
      'key-strengths': Array.isArray(candidateForm['key-strengths']) 
        ? candidateForm['key-strengths'].join(', ')
        : candidateForm['key-strengths'],
    };
    
    // Set the actual political-party value from other-party if 'other' is selected
    if (formattedForm['political-party'] === 'other' && formattedForm['other-party']) {
      formattedForm['political-party'] = formattedForm['other-party'];
    }
    
    // Remove the individual political affiliation fields and other-party before sending
    delete formattedForm['political-affiliation-type'];
    delete formattedForm['political-affiliation-strength'];
    delete formattedForm['other-party'];
    
    // Save data to session storage for persistence between pages
    sessionStorage.setItem('candidateProfile', JSON.stringify(formattedForm));
    
    // Navigate to speech parameters page
    navigate('/speech-parameters');
  };

  // Check if 'other' party is selected
  const isOtherPartySelected = candidateForm['political-party'] === 'other';
  
  // Get available candidates based on selected party
  const availableCandidates = candidateForm['political-party'] && !isOtherPartySelected 
    ? CANDIDATES_BY_PARTY[candidateForm['political-party']] || []
    : [];

  return (
    <>
      {/* Candidate Profile Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Candidate Profile
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Enter details about the candidate to personalize the generated speech.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          {/* Political Party Dropdown */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Select the political party the candidate represents.
              </Typography>
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="political-party-label">Political Party</InputLabel>
              <Select
                labelId="political-party-label"
                id="political-party"
                value={candidateForm['political-party']}
                label="Political Party"
                onChange={handlePartyChange}
              >
                {POLITICAL_PARTY_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Other Party Text Field (shown only when 'other' is selected) */}
          {isOtherPartySelected && (
            <Grid item xs={12} md={6}>
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">
                  Enter the name of the political party.
                </Typography>
              </Box>
              <TextInput
                id="other-party"
                label="Party Name"
                value={candidateForm['other-party']}
                onChange={handleChange('other-party')}
                placeholder="Enter political party name"
                required
              />
            </Grid>
          )}
          
          {/* Candidate Name (dropdown or text field based on selection) */}
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                {!isOtherPartySelected && candidateForm['political-party'] 
                  ? "Select the candidate from the list" 
                  : "Enter the full name of the candidate"}
              </Typography>
            </Box>
            {!isOtherPartySelected && candidateForm['political-party'] && availableCandidates.length > 0 ? (
              <FormControl fullWidth margin="normal">
                <InputLabel id="candidate-name-label">Candidate Name</InputLabel>
                <Select
                  labelId="candidate-name-label"
                  id="candidate-name"
                  value={candidateForm['candidate-name']}
                  label="Candidate Name"
                  onChange={handleCandidateChange}
                  required
                >
                  {availableCandidates.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextInput
                id="candidate-name"
                label="Name"
                value={candidateForm['candidate-name']}
                onChange={handleChange('candidate-name')}
                placeholder="Enter candidate's full name"
                required
              />
            )}
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
              onChange={handleMultiSelectChange}
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
              rows={2}
              contextInfo="Existing values/beliefs are the core principles that your target audience strongly identifies with. Understanding these values helps create speeches that resonate with their worldview."
              systemPrompt="You are a political analyst specializing in voter values and beliefs. Generate a concise list of core values that would be important to the described audience, separated by commas."
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            endIcon={<ArrowForwardIcon />} 
            onClick={handleNext}
            size="large"
          >
            Next: Speech Parameters
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default CandidateProfile; 