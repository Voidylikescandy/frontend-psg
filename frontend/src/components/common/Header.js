import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TranslateIcon from '@mui/icons-material/Translate';

const Header = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Political Speech Generator
        </Typography>
        {isAuthenticated() ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/"
              sx={{ mr: 1 }}
            >
              Home
            </Button>
            
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/speech-edit"
              startIcon={<EditIcon />}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/speech-analysis"
              startIcon={<AnalyticsIcon />}
              sx={{ mr: 1 }}
            >
              Analysis
            </Button>
            
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/speech-translate"
              startIcon={<TranslateIcon />}
              sx={{ mr: 1 }}
            >
              Translate
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
                ml: 1
              }}
            />
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 