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
  MenuItem,
  TextField
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextInput from '../components/forms/TextInput';
import TextAreaWithWordLimit from '../components/forms/TextAreaWithWordLimit';
import MultiSelectDropdown from '../components/forms/MultiSelectDropdown';

// Options for key strengths/expertise dropdown
const EXPERTISE_OPTIONS = [
  { value: 'Education', label: 'Education' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Economy', label: 'Economy' },
  { value: 'Environment', label: 'Environment' },
  { value: 'National Security', label: 'National Security' },
  { value: 'Foreign Policy', label: 'Foreign Policy' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Social Justice', label: 'Social Justice' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'Housing', label: 'Housing' },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Energy', label: 'Energy' },
];

// Options for education level dropdown
const EDUCATION_LEVEL_OPTIONS = [
  { value: 'Primary Education', label: 'Primary Education' },
  { value: 'High School', label: 'High School' },
  { value: 'Undergraduate', label: 'Undergraduate' },
  { value: 'Graduate (Master\'s)', label: 'Graduate (Master\'s)' },
  { value: 'Post-Graduate (PhD)', label: 'Post-Graduate (PhD)' },
  { value: 'Professional Degree', label: 'Professional Degree' },
  { value: 'Mixed Education Levels', label: 'Mixed Education Levels' },
];

// Options for political affiliation
const POLITICAL_AFFILIATION_OPTIONS = [
  { value: 'Leftist', label: 'Leftist' },
  { value: 'Center-Left', label: 'Center-Left' },
  { value: 'Centrist', label: 'Centrist' },
  { value: 'Center-Right', label: 'Center-Right' },
  { value: 'Rightist', label: 'Rightist' },
  { value: 'Mixed/Various', label: 'Mixed/Various' },
];

// Options for political affiliation strength
const AFFILIATION_STRENGTH_OPTIONS = [
  { value: 'Strong', label: 'Strong' },
  { value: 'Moderate', label: 'Moderate' },
  { value: 'Weak', label: 'Weak' },
];

const CandidateProfile = () => {
  const navigate = useNavigate();

  // State for candidate profile form
  const [candidateForm, setCandidateForm] = useState({
    'candidate-name': '',
    'political-party': '',
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
    
    // Remove the individual political affiliation fields before sending
    delete formattedForm['political-affiliation-type'];
    delete formattedForm['political-affiliation-strength'];
    
    // Save data to session storage for persistence between pages
    sessionStorage.setItem('candidateProfile', JSON.stringify(formattedForm));
    
    // Navigate to speech parameters page
    navigate('/speech-parameters');
  };

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
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Enter the full name of the candidate who will be delivering the speech.
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
          <Grid item xs={12} md={6}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Specify the political party the candidate represents, if applicable.
              </Typography>
            </Box>
            <TextInput
              id="political-party"
              label="Political Party (if applicable)"
              value={candidateForm['political-party']}
              onChange={handleChange('political-party')}
              placeholder="e.g., Bharatiya Janata Party, Indian National Congress, etc."
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
            <TextField
              id="primary-concerns"
              label="Primary Concerns/Needs"
              value={candidateForm['primary-concerns']}
              onChange={handleChange('primary-concerns')}
              placeholder="e.g., Job security, Healthcare costs, Education quality, Climate change"
              fullWidth
              multiline
              rows={2}
              margin="normal"
            />
          </Grid>

          {/* Existing Values/Beliefs */}
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">
                Describe the core values and beliefs held by your audience. Separate multiple values with commas.
              </Typography>
            </Box>
            <TextField
              id="existing-values"
              label="Existing Values/Beliefs"
              value={candidateForm['existing-values']}
              onChange={handleChange('existing-values')}
              placeholder="e.g., Family values, Individual liberty, Community welfare, Environmental stewardship"
              fullWidth
              multiline
              rows={2}
              margin="normal"
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