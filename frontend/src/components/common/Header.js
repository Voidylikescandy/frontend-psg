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
            Home
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/candidate-profile"
            sx={{ mr: 2 }}
          >
            Speech Creation
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/load-templates"
            sx={{ mr: 2 }}
          >
            Load Templates
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/speech-edit"
            sx={{ mr: 2 }}
          >
            Edit Speech
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/speech-analysis"
            sx={{ mr: 2 }}
          >
            Speech Analysis
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