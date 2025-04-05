import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  Box, 
  OutlinedInput,
  FormHelperText
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelectDropdown = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  fullWidth = true,
  margin = 'normal',
  error = false,
  helperText = '',
}) => {
  // Handle internal change to ensure we're always working with arrays
  const handleChange = (event) => {
    // Pass the raw array value to the parent onChange
    onChange(event);
  };

  // Ensure value is always an array for internal component use
  const valueArray = Array.isArray(value) 
    ? value 
    : (typeof value === 'string' ? value.split(',').map(v => v.trim()).filter(v => v !== '') : []);

  return (
    <FormControl 
      fullWidth={fullWidth} 
      margin={margin} 
      required={required}
      error={error}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        multiple
        value={valueArray}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip 
                key={value} 
                label={options.find(option => option.value === value)?.label || value} 
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MultiSelectDropdown; 