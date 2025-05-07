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
  InputBase,
  Tooltip
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import { GROQ_API_KEY } from '../../utils/constants';

const AISuggestionTextBox = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  promptPlaceholder = 'E.g., Generate key messages about economic policy focused on job creation...',
  required = false,
  fullWidth = true,
  margin = 'normal',
  variant = 'outlined',
  error = false,
  helperText = '',
  rows = 4,
  multiline = true,
  maxRows = 10,
  contextInfo = 'Generate content based on this context.', // Default context info
  systemPrompt = 'You are an assistant helping draft political speech content. Keep responses concise, relevant and persuasive.',
}) => {
  const [open, setOpen] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const abortControllerRef = useRef(null);
  const accumulatedTextRef = useRef('');

  const handleOpenDialog = () => {
    setOpen(true);
    setUserPrompt('');
  };

  const handleCloseDialog = () => {
    setOpen(false);
    // If generation is in progress, abort it
    if (isGenerating && abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const handleUserPromptChange = (e) => {
    setUserPrompt(e.target.value);
  };

  // Clean up the generated text
  const cleanupGeneratedText = (text) => {
    if (!text) return '';
    
    // Remove common prefixes
    let cleaned = text.replace(/^(Here are|Here's|Following are|These are|I've created|I have created|Below are).*?:\s*/i, '');
    
    // Remove common suffixes
    cleaned = cleaned.replace(/\s*(These (key messages|points|items|elements) (aim|serve|help|work) to.*?$)/, '');
    cleaned = cleaned.replace(/\s*(This will help|This should|This addresses|This aligns|This focuses|This emphasizes|The above|In conclusion|These points).*?$/, '');
    
    // Remove bullets, asterisks, quotes, and numbering
    cleaned = cleaned.replace(/^[\s•*\-–—→⇒]+|^[0-9]+\.\s+|^"|\s*"$/gm, '');
    
    // Remove extra quotation marks around items
    cleaned = cleaned.replace(/"\s*(.+?)\s*"/g, '$1');
    
    // Remove any trailing explanations or summaries (common in AI outputs)
    cleaned = cleaned.replace(/\n\n.*?(summarize|summary|overview|outline|highlight|emphasize|focus|address).*/is, '');
    
    // Normalize line breaks and spacing
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');  // No more than 2 consecutive line breaks
    cleaned = cleaned.trim();

    return cleaned;
  };

  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedText('');
    accumulatedTextRef.current = ''; // Reset accumulated text
    
    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // Prepare the enhanced system prompt to get cleaner output
      const enhancedSystemPrompt = `${systemPrompt}
      
IMPORTANT FORMATTING INSTRUCTIONS:
1. Do NOT include introductions like "Here are" or "Below are".
2. Do NOT include conclusions or summaries at the end.
3. Present information directly without bullet points, numbering, or quotation marks.
4. Each point should be on a new line.
5. Keep responses focused, concise, and to the point.
6. Do not explain what you're doing or why you've chosen these points.`;
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
          messages: [
            { role: 'system', content: enhancedSystemPrompt },
            { role: 'user', content: `${contextInfo}\n\n${userPrompt}` }
          ],
          temperature: 0.7,
          max_tokens: 1024,
          stream: true,
        }),
        signal,
      });

      // Handle streaming response - accumulate but don't show until complete
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsedData = JSON.parse(data);
              const content = parsedData.choices[0]?.delta?.content || '';
              if (content) {
                accumulatedTextRef.current += content;
                // Don't update UI during streaming
              }
            } catch (e) {
              console.error('Error parsing streaming data:', e);
            }
          }
        }
      }
      
      // Clean up the text after generation is complete and update UI once
      setGeneratedText(cleanupGeneratedText(accumulatedTextRef.current));
      setIsGenerating(false);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error generating content:', error);
      }
      setIsGenerating(false);
    }
  };

  const handleAcceptGeneration = () => {
    // Trigger the onChange event with the generated text
    const event = {
      target: {
        value: generatedText
      }
    };
    onChange(event);
    handleCloseDialog();
  };

  const handleInsertGeneration = () => {
    // Insert the generated text at cursor position or append to existing text
    const event = {
      target: {
        value: value ? `${value}\n${generatedText}` : generatedText
      }
    };
    onChange(event);
    handleCloseDialog();
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <TextField
          id={id}
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          fullWidth={fullWidth}
          margin={margin}
          variant={variant}
          error={error}
          helperText={helperText}
          multiline={multiline}
          rows={rows}
          maxRows={maxRows}
          InputProps={{
            endAdornment: (
              <Tooltip title="Generate with AI">
                <IconButton 
                  onClick={handleOpenDialog}
                  edge="end"
                  sx={{ color: 'primary.main' }}
                >
                  <AutoAwesomeIcon />
                </IconButton>
              </Tooltip>
            )
          }}
        />
      </Box>

      <Dialog 
        open={open} 
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
          <Typography variant="h6">Generate Content with AI</Typography>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2, pb: 1 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Context Information:
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default', maxHeight: '200px', overflowY: 'auto' }}>
              <Typography variant="body2">{contextInfo}</Typography>
            </Paper>
          </Box>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Tell the AI what you want to generate:
            </Typography>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 1, 
                display: 'flex', 
                alignItems: 'center',
                mb: 2
              }}
            >
              <InputBase
                sx={{ flex: 1, px: 1 }}
                placeholder={promptPlaceholder}
                value={userPrompt}
                onChange={handleUserPromptChange}
                multiline
                rows={2}
                fullWidth
              />
              <Button 
                variant="contained" 
                onClick={handleGenerate}
                disabled={isGenerating || !userPrompt.trim()}
                sx={{ ml: 1 }}
              >
                {isGenerating ? <CircularProgress size={24} /> : 'Generate'}
              </Button>
            </Paper>
          </Box>
          
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Typography variant="subtitle2" gutterBottom>
              Generated Content:
            </Typography>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                overflowY: 'auto', 
                flex: 1,
                bgcolor: generatedText ? 'background.paper' : 'background.default',
                position: 'relative'
              }}
            >
              {isGenerating && (
                <Box sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: 3,
                  zIndex: 1
                }}>
                  <CircularProgress size={40} sx={{ mb: 2 }} />
                  <Typography variant="body2">Generating content...</Typography>
                </Box>
              )}
              <TextField
                multiline
                fullWidth
                variant="standard"
                value={generatedText}
                onChange={(e) => setGeneratedText(e.target.value)}
                placeholder="AI-generated content will appear here..."
                disabled={isGenerating}
                InputProps={{ disableUnderline: true }}
                sx={{
                  '.MuiInputBase-root': {
                    height: '100%',
                    padding: 0,
                  },
                  '.MuiInputBase-input': {
                    height: '100%',
                    whiteSpace: 'pre-wrap',
                    color: generatedText ? 'text.primary' : 'text.disabled',
                    fontStyle: generatedText ? 'normal' : 'italic',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    lineHeight: 'inherit',
                    padding: 0,
                  }
                }}
              />
            </Paper>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Box>
            <Button 
              onClick={handleInsertGeneration} 
              disabled={!generatedText || isGenerating}
              sx={{ mr: 1 }}
            >
              Insert at End
            </Button>
            <Button 
              onClick={handleAcceptGeneration} 
              variant="contained" 
              color="primary" 
              disabled={!generatedText || isGenerating}
            >
              Replace All
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AISuggestionTextBox; 