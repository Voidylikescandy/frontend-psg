import React, { useMemo, useEffect } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const TextAreaWithWordLimit = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  maxWords = 500,
  rows = 4,
  fullWidth = true,
  margin = 'normal',
  variant = 'outlined',
  error = false,
  helperText = '',
}) => {
  // Calculate word count
  const wordCount = useMemo(() => {
    if (!value) return 0;
    return value.trim().split(/\s+/).filter(word => word !== '').length;
  }, [value]);

  // Truncate text when it exceeds word limit
  useEffect(() => {
    if (wordCount > maxWords && value) {
      const words = value.trim().split(/\s+/).filter(word => word !== '');
      const truncatedWords = words.slice(0, maxWords);
      const truncatedText = truncatedWords.join(' ');
      
      // Create a synthetic event to pass to onChange
      const syntheticEvent = {
        target: {
          value: truncatedText
        }
      };
      
      onChange(syntheticEvent);
    }
  }, [wordCount, maxWords, value, onChange]);

  return (
    <>
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
        multiline
        rows={rows}
        error={error}
        helperText={helperText}
      />
      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Typography 
          variant="caption" 
          color={wordCount >= maxWords ? 'error' : 'textSecondary'}
        >
          {wordCount} / {maxWords} words
        </Typography>
      </Box>
    </>
  );
};

export default TextAreaWithWordLimit; 