import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Political Speech Generator
        </Typography>
        {isAuthenticated() ? (
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
              sx={{ mr: 2 }}
            >
              Data Visualization
            </Button>
            
            {/* Profile link */}
            <Chip
              icon={<PersonIcon />}
              label={user?.username || 'Profile'}
              component={RouterLink}
              to="/profile"
              clickable
              color="primary"
              variant="outlined"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '& .MuiChip-icon': { color: 'white' },
                ml: 2
              }}
            />
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 