import React, { useState, useRef } from 'react';
import { 
  TextField, 
  Box, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Popper,
  Fade,
  ClickAwayListener
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AIEditTextBox = ({ 
  value, 
  onChange,
  placeholder = '', 
  fullWidth = true,
  rows = 15,
  variant = 'outlined',
  sx = {}
}) => {
  const [selectedText, setSelectedText] = useState({
    text: '',
    start: 0,
    end: 0
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [regeneratedText, setRegeneratedText] = useState('');
  const [generationLoading, setGenerationLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const textFieldRef = useRef(null);
  const abortControllerRef = useRef(null);
  
  // Monitor selection in the text field
  const handleTextSelection = () => {
    if (textFieldRef.current) {
      const textArea = textFieldRef.current.querySelector('textarea');
      
      if (textArea && textArea.selectionStart !== textArea.selectionEnd) {
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const selectedContent = value.substring(start, end);
        
        if (selectedContent.trim() !== '') {
          setSelectedText({
            text: selectedContent,
            start,
            end
          });
          
          // Position the popper near the selection
          setAnchorEl(textArea);
          setPopperOpen(true);
          return;
        }
      }
    }
    
    // If we get here, there's no valid selection
    setPopperOpen(false);
  };
  
  // Handle when user clicks outside the popper
  const handleClickAway = () => {
    setPopperOpen(false);
  };
  
  // Handle opening the regeneration dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
    setPopperOpen(false);
    setPromptText('');
    setRegeneratedText('');
  };
  
  // Handle closing the regeneration dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    
    // If generation is in progress, abort it
    if (generationLoading && abortControllerRef.current) {
      abortControllerRef.current.abort();
      setGenerationLoading(false);
    }
  };
  
  // Update the prompt text
  const handlePromptChange = (e) => {
    setPromptText(e.target.value);
  };
  
  // Update the regenerated text (for manual edits)
  const handleRegeneratedTextChange = (e) => {
    setRegeneratedText(e.target.value);
  };
  
  // Generate new text based on the prompt
  const handleGenerate = async () => {
    if (!promptText.trim()) return;
    
    setGenerationLoading(true);
    setRegeneratedText('');
    
    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    try {
      // Create a comprehensive system prompt
      const systemPrompt = `You are a professional speech writer. Your task is to rewrite a specific section of a political speech.
      
IMPORTANT INSTRUCTIONS:
1. Focus ONLY on the selected section that needs to be rewritten.
2. Maintain the same approximate length as the original section.
3. Keep the style, tone, and flow consistent with the rest of the speech.
4. Follow the user's instructions exactly for how to modify this section.
5. Do not add introductory phrases like "Here's the rewritten section" - just provide the new text only.
6. Your response should be a direct replacement for the selected section, nothing more.`;

      // Create the context with the entire speech and highlight the selected section
      const fullContext = `FULL SPEECH CONTEXT (for reference only):
${value}

SELECTED SECTION TO REWRITE (modify ONLY this part):
${selectedText.text}

INSTRUCTIONS: ${promptText}`;
      
      // Call the Groq API for text generation
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: fullContext }
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
        signal,
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        // Clean up the response text
        let generatedContent = data.choices[0].message.content;
        
        // Remove any markdown formatting that might be present
        generatedContent = generatedContent.replace(/```[a-z]*\n|```/g, '');
        
        // Remove any introductory text like "Here's the rewritten section:"
        const introPatterns = [
          /^here['']s the rewritten section:?\s*/i,
          /^rewritten section:?\s*/i,
          /^revised section:?\s*/i,
          /^updated section:?\s*/i,
          /^new section:?\s*/i,
          /^the rewritten text:?\s*/i
        ];
        
        for (const pattern of introPatterns) {
          generatedContent = generatedContent.replace(pattern, '');
        }
        
        setRegeneratedText(generatedContent.trim());
      } else {
        console.error('Unexpected API response structure:', data);
        setRegeneratedText('Error: Failed to generate content. Please try again.');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error generating content:', error);
        setRegeneratedText('Error: ' + error.message);
      }
    } finally {
      setGenerationLoading(false);
    }
  };
  
  // Apply the regenerated text to the main content
  const handleApplyChanges = () => {
    if (!regeneratedText || selectedText.start === selectedText.end) return;
    
    const newValue = value.substring(0, selectedText.start) + 
                     regeneratedText + 
                     value.substring(selectedText.end);
    
    onChange({ target: { value: newValue } });
    setDialogOpen(false);
  };
  
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TextField
        ref={textFieldRef}
        fullWidth={fullWidth}
        multiline
        rows={rows}
        variant={variant}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onMouseUp={handleTextSelection}
        onKeyUp={handleTextSelection}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#f9f9f9',
          }
        }}
      />
      
      {/* Floating action button for regeneration */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <Popper
          open={popperOpen}
          anchorEl={anchorEl}
          placement="top"
          transition
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 10],
              },
            },
          ]}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={3} sx={{ p: 1, maxWidth: 200 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    Regenerate selection
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => setPopperOpen(false)}
                    sx={{ ml: 1 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  startIcon={<AutoFixHighIcon />}
                  onClick={handleOpenDialog}
                >
                  Rewrite with AI
                </Button>
              </Paper>
            </Fade>
          )}
        </Popper>
      </ClickAwayListener>
      
      {/* Dialog for AI regeneration */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        fullWidth 
        maxWidth="md"
        PaperProps={{
          sx: {
            height: '80vh',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Rewrite Selection with AI</Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2, pb: 1 }}>
          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Selected Text
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="body2">
                {selectedText.text}
              </Typography>
            </Paper>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Instructions
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Describe how you want to improve this section..."
              value={promptText}
              onChange={handlePromptChange}
              variant="outlined"
            />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerate}
              disabled={!promptText.trim() || generationLoading}
              startIcon={generationLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {generationLoading ? 'Generating...' : 'Generate'}
            </Button>
          </Box>
          
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Result (editable)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              value={regeneratedText}
              onChange={handleRegeneratedTextChange}
              placeholder="AI-generated content will appear here..."
              sx={{ flex: 1 }}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleApplyChanges} 
            color="primary" 
            variant="contained"
            disabled={!regeneratedText}
            startIcon={<CheckCircleIcon />}
          >
            Apply Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AIEditTextBox; 