import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Political Speech Generator
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            sx={{ mr: 2 }}
          >
            Candidate Profile
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/speech-parameters"
            sx={{ mr: 2 }}
          >
            Speech Parameters
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/data-visualization"
          >
            Data Visualization
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 