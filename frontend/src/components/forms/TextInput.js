import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  fullWidth = true,
  margin = 'normal',
  variant = 'outlined',
  error = false,
  helperText = '',
  type = 'text'
}) => {
  return (
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
      type={type}
    />
  );
};

export default TextInput; 