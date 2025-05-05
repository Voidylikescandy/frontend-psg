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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Tooltip,
  Collapse,
  IconButton
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RefreshIcon from '@mui/icons-material/Refresh';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoodIcon from '@mui/icons-material/Mood';
import axios from 'axios';
import { SAPLING_API_KEY } from '../utils/constants';

const SpeechAnalysis = () => {
  const [speechData, setSpeechData] = useState({
    speech: '',
    key_themes: [],
    sentiment: { category: '', explanation: '' }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [toneData, setToneData] = useState(null);
  const [toneExpanded, setToneExpanded] = useState(false);
  const [toneLoading, setToneLoading] = useState(false);
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
        // Reset any previous analysis
        setStatistics(null);
        setExpanded(false);
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
    setStatistics(null);
    setExpanded(false);
    setToneData(null);
    setToneExpanded(false);
    setError('');
  };

  // Analyze speech using Sapling.ai API
  const analyzeReadability = async () => {
    if (!speechData.speech) {
      setError('Please provide speech text for analysis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://api.sapling.ai/api/v1/statistics',
        {
          key: SAPLING_API_KEY,
          text: speechData.speech,
        }
      );
      
      setStatistics(response.data);
      setExpanded(true);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.response?.data?.msg || 'Failed to analyze speech text');
    } finally {
      setLoading(false);
    }
  };

  // Download statistics as JSON
  const downloadStatistics = () => {
    if (!statistics) return;
    
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(statistics, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `speech_statistics_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Analyze tone using Sapling.ai API
  const analyzeTone = async () => {
    if (!speechData.speech) {
      setError('Please provide speech text for analysis');
      return;
    }

    setToneLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://api.sapling.ai/api/v1/tone',
        {
          key: SAPLING_API_KEY,
          text: speechData.speech,
        }
      );
      
      setToneData(response.data);
      setToneExpanded(true);
    } catch (err) {
      console.error('Tone analysis error:', err);
      setError(err.response?.data?.msg || 'Failed to analyze speech tone');
    } finally {
      setToneLoading(false);
    }
  };

  // Download tone data as JSON
  const downloadToneData = () => {
    if (!toneData) return;
    
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(toneData, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `speech_tone_analysis_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  // Get color for tone
  const getToneColor = (tone) => {
    const toneColors = {
      'admiring': '#B39DDB', // light purple
      'amused': '#FFCC80', // light orange
      'angry': '#EF5350', // red
      'annoyed': '#FF8A65', // light red
      'approving': '#81C784', // light green
      'aware': '#90CAF9', // light blue
      'confident': '#4FC3F7', // blue
      'confused': '#CE93D8', // purple
      'curious': '#4DD0E1', // cyan
      'eager': '#FFD54F', // amber
      'disappointed': '#7986CB', // indigo
      'disapproving': '#E57373', // light red
      'embarrassed': '#F48FB1', // pink
      'excited': '#FFF176', // yellow
      'fearful': '#9575CD', // deep purple
      'grateful': '#A5D6A7', // green
      'joyful': '#FFEB3B', // yellow
      'loving': '#F06292', // pink
      'mournful': '#78909C', // blue gray
      'neutral': '#E0E0E0', // gray
      'optimistic': '#AED581', // light green
      'relieved': '#80DEEA', // cyan
      'remorseful': '#9FA8DA', // indigo
      'repulsed': '#BA68C8', // purple
      'sad': '#90A4AE', // blue gray
      'worried': '#A1887F', // brown
      'surprised': '#FFB74D', // orange
      'sympathetic': '#80CBC4', // teal
    };
    
    return toneColors[tone] || '#E0E0E0'; // default to gray if tone not found
  };
  
  // Helper to render colored sentence with tone on hover
  const renderColoredSentence = (sentence, tones) => {
    const primaryTone = tones[0][1]; // Get the highest probability tone
    const toneColor = getToneColor(primaryTone);
    
    const allTones = tones.map(tone => `${tone[1]} (${(tone[0] * 100).toFixed(1)}%)`).join(', ');
    
    return (
      <Tooltip title={`Tones: ${allTones}`} placement="top" arrow>
        <Box 
          component="span" 
          sx={{ 
            backgroundColor: toneColor,
            padding: '2px 4px',
            borderRadius: '4px',
            margin: '2px',
            display: 'inline-block',
            cursor: 'help'
          }}
        >
          {sentence}
        </Box>
      </Tooltip>
    );
  };

  // Helper function to render a readability score meter
  const renderReadabilityMeter = (score, min, max, label, description) => {
    // Normalize score between 0 and 100 for the progress bar
    const normalizedScore = Math.max(0, Math.min(100, ((score - min) / (max - min)) * 100));
    
    // Determine color based on complexity (for visual indication)
    let color = 'primary';
    if (score > (max * 0.8)) color = 'error';
    else if (score > (max * 0.6)) color = 'warning';
    
    return (
      <Box sx={{ mb: 2 }}>
        <Tooltip title={description} placement="top-start">
          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{label}</span>
            <span>{score?.toFixed(2)}</span>
          </Typography>
        </Tooltip>
        <LinearProgress 
          variant="determinate" 
          value={normalizedScore} 
          color={color}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
    );
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

      {/* Speech Content */}
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
      
      {/* Readability Analysis Box */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Readability Analysis
        </Typography>
        <Card 
          sx={{ 
            p: 3,
            transition: 'all 0.3s ease-in-out',
            boxShadow: expanded ? '0 8px 24px rgba(0,0,0,0.12)' : 'none'
          }}
        >
          <Typography variant="body1" color="textSecondary" paragraph>
            Analyze the readability of your speech text to understand its complexity and accessibility.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AnalyticsIcon />}
              onClick={analyzeReadability}
              disabled={loading || !speechData.speech}
              sx={{ minWidth: '250px' }}
            >
              {loading ? 'Analyzing...' : statistics ? 'Analyze Again' : 'Analyze Readability'}
            </Button>
          </Box>
          
          <Collapse in={expanded} timeout={500} sx={{ mt: 2 }}>
            {statistics && (
              <>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlineIcon color="success" />
                  <Typography variant="subtitle1" color="success.main">
                    Analysis complete!
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={downloadStatistics}
                  >
                    Download Results
                  </Button>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Grid container spacing={3}>
                  {/* Basic Statistics Card */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Basic Statistics
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell><b>Characters</b></TableCell>
                            <TableCell>{statistics.chars}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><b>Words</b></TableCell>
                            <TableCell>{statistics.words}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><b>Sentences</b></TableCell>
                            <TableCell>{statistics.sentences}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><b>Difficult Words</b></TableCell>
                            <TableCell>{statistics.readability_scores.difficult_words}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell><b>Text Standard</b></TableCell>
                            <TableCell>{statistics.readability_scores.text_standard}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* Readability Scores Card */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Readability Score Summary
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      {renderReadabilityMeter(
                        statistics.readability_scores.flesch_kincaid_grade, 
                        0, 
                        20, 
                        "Flesch-Kincaid Grade Level", 
                        "Represents the U.S. grade level required to understand the text. Lower score means easier to read."
                      )}
                      
                      {renderReadabilityMeter(
                        statistics.readability_scores.flesch_reading_ease, 
                        0, 
                        100, 
                        "Flesch Reading Ease", 
                        "100-90: Very easy, 90-80: Easy, 80-70: Fairly easy, 70-60: Standard, 60-50: Fairly difficult, 50-30: Difficult, 30-0: Very difficult"
                      )}
                      
                      {renderReadabilityMeter(
                        statistics.readability_scores.gunning_fog, 
                        0, 
                        20, 
                        "Gunning Fog Index", 
                        "Estimates years of formal education needed to understand text. Lower is easier to read."
                      )}
                      
                      {renderReadabilityMeter(
                        statistics.readability_scores.automated_readability_index, 
                        0, 
                        20, 
                        "Automated Readability Index", 
                        "Provides a grade level score. Lower is easier to read."
                      )}
                    </Box>
                  </Grid>

                  {/* Detailed Readability Metrics */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Detailed Readability Metrics
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Metric</b></TableCell>
                            <TableCell><b>Value</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Coleman-Liau Index</TableCell>
                            <TableCell>{statistics.readability_scores.coleman_liau_index.toFixed(2)}</TableCell>
                            <TableCell>Grade level based on character count rather than syllables</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Dale-Chall Readability</TableCell>
                            <TableCell>{statistics.readability_scores.dale_chall_readability_score.toFixed(2)}</TableCell>
                            <TableCell>Grade level based on percentage of difficult words</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Linsear Write Formula</TableCell>
                            <TableCell>{statistics.readability_scores.linsear_write_formula.toFixed(2)}</TableCell>
                            <TableCell>Readability based on easy words vs. difficult words</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>McAlpine EFLAW Score</TableCell>
                            <TableCell>{statistics.readability_scores.mcalpine_eflaw.toFixed(2)}</TableCell>
                            <TableCell>Measures readability for non-native English speakers</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>SMOG Index</TableCell>
                            <TableCell>{statistics.readability_scores.smog_index.toFixed(2)}</TableCell>
                            <TableCell>Grade level based on number of polysyllables</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Spache Readability</TableCell>
                            <TableCell>{statistics.readability_scores.spache_readability.toFixed(2)}</TableCell>
                            <TableCell>Grade level formula for early readers</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </>
            )}
          </Collapse>
        </Card>
      </Box>
      
      {/* Tone Analysis Box */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Emotional Tone Analysis
        </Typography>
        <Card 
          sx={{ 
            p: 3,
            transition: 'all 0.3s ease-in-out',
            boxShadow: toneExpanded ? '0 8px 24px rgba(0,0,0,0.12)' : 'none'
          }}
        >
          <Typography variant="body1" color="textSecondary" paragraph>
            Analyze the emotional tone of your speech to understand how it may be perceived by your audience.
          </Typography>
          
          {/* Tone Legend */}
          <Box sx={{ mb: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Tone Descriptions
            </Typography>
            <Typography variant="body2" paragraph>
              The analysis includes 28 different tones. Hover over each color to see the tone description.
            </Typography>
            <Grid container spacing={1}>
              {[
                { tone: 'admiring', desc: 'With respect and reverence, expressing regard or affection' },
                { tone: 'amused', desc: 'Light-hearted, signaling laughter or enjoyment' },
                { tone: 'angry', desc: 'Strong displeasure or rage, sharp or harsh expressions' },
                { tone: 'annoyed', desc: 'Irritation or frustration, less intense than anger' },
                { tone: 'approving', desc: 'Suggests agreement or validation, conveying acceptance' },
                { tone: 'aware', desc: 'Indicates understanding or consciousness about the subject' },
                { tone: 'confident', desc: 'Exudes certainty and assurance, often assertive' },
                { tone: 'confused', desc: 'Uncertainty or bewilderment, lack of understanding' },
                { tone: 'curious', desc: 'Questioning, eager to learn or know more' },
                { tone: 'eager', desc: 'Enthusiasm and keenness, characterized by anticipation' },
                { tone: 'disappointed', desc: 'Sense of letdown when expectations are not met' },
                { tone: 'disapproving', desc: 'Negative judgment, criticism, or dissatisfaction' },
                { tone: 'embarrassed', desc: 'Self-conscious, shame, or awkwardness' },
                { tone: 'excited', desc: 'Full of enthusiasm and anticipation, high energy' },
                { tone: 'fearful', desc: 'Apprehension, anxiety, or dread of perceived threat' },
                { tone: 'grateful', desc: 'Expresses appreciation or thankfulness' },
                { tone: 'joyful', desc: 'Happiness, delight, or pleasure, positive energy' },
                { tone: 'loving', desc: 'Affection, warmth, and tenderness, care' },
                { tone: 'mournful', desc: 'Sorrow or grief, lamenting a loss or tragedy' },
                { tone: 'neutral', desc: 'Objective or impartial attitude, devoid of emotion' },
                { tone: 'optimistic', desc: 'Hopefulness and confidence about outcomes' },
                { tone: 'relieved', desc: 'Release from stress or worry after resolution' },
                { tone: 'remorseful', desc: 'Regret or guilt over past actions or events' },
                { tone: 'repulsed', desc: 'Strong aversion or disgust towards a subject' },
                { tone: 'sad', desc: 'Unhappiness, sorrow, or grief, negative emotional state' },
                { tone: 'worried', desc: 'Unease or concern, anticipating potential problems' },
                { tone: 'surprised', desc: 'Shock or astonishment from unexpected information' },
                { tone: 'sympathetic', desc: 'Understanding and compassion towards others' },
              ].map((item, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Tooltip title={item.desc} placement="top" arrow>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      cursor: 'help'
                    }}>
                      <Box 
                        sx={{ 
                          width: 16, 
                          height: 16, 
                          backgroundColor: getToneColor(item.tone),
                          borderRadius: '4px'
                        }} 
                      />
                      <Typography variant="body2">{item.tone}</Typography>
                    </Box>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={toneLoading ? <CircularProgress size={20} color="inherit" /> : <MoodIcon />}
              onClick={analyzeTone}
              disabled={toneLoading || !speechData.speech}
              sx={{ minWidth: '250px' }}
            >
              {toneLoading ? 'Analyzing...' : toneData ? 'Analyze Again' : 'Analyze Tone'}
            </Button>
          </Box>
          
          <Collapse in={toneExpanded} timeout={500} sx={{ mt: 2 }}>
            {toneData && (
              <>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlineIcon color="success" />
                  <Typography variant="subtitle1" color="success.main">
                    Tone analysis complete!
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={downloadToneData}
                  >
                    Download Results
                  </Button>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Grid container spacing={3}>
                  {/* Overall Tone Analysis */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Overall Speech Tone
                    </Typography>
                    
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Tone</b></TableCell>
                            <TableCell><b>Probability</b></TableCell>
                            <TableCell><b>Indicator</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {toneData.overall.map((tone, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Box 
                                    sx={{ 
                                      width: 12, 
                                      height: 12, 
                                      backgroundColor: getToneColor(tone[1]),
                                      borderRadius: '3px'
                                    }} 
                                  />
                                  {tone[1]}
                                </Box>
                              </TableCell>
                              <TableCell>{(tone[0] * 100).toFixed(1)}%</TableCell>
                              <TableCell>{tone[2]}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  {/* Sentence-by-Sentence Analysis */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Detailed Tone Analysis
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      The speech has been analyzed sentence by sentence. Hover over each colored segment to view the detected tones.
                    </Typography>

                    {/* Sentence Count Stats */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2">
                        <b>Total Sentences:</b> {toneData.sents.length}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  {/* Colored Speech Text */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Speech with Tone Highlighting
                    </Typography>
                    <Card sx={{ p: 3, maxHeight: '400px', overflow: 'auto', backgroundColor: '#fdfdfd' }}>
                      <Box sx={{ lineHeight: 1.8 }}>
                        {toneData.sents.map((sentence, index) => (
                          <React.Fragment key={index}>
                            {renderColoredSentence(sentence, toneData.results[index])}
                            {' '}
                          </React.Fragment>
                        ))}
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </>
            )}
          </Collapse>
        </Card>
      </Box>
    </Paper>
  );
};

export default SpeechAnalysis; 