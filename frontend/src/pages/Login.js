import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Link, 
  Alert,
  CircularProgress,
  Divider,
  Chip
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import { ADMIN_USER } from '../utils/constants';
import axios from 'axios';
import API_URL from '../config';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const { login, error, loading } = useAuth();
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    // Reset verification state when user changes input
    if (needsVerification) {
      setNeedsVerification(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      // Check if the error is due to unverified email
      if (err.response && err.response.status === 403 && err.response.data.needs_verification) {
        setNeedsVerification(true);
        setVerificationEmail(err.response.data.email);
      }
      // Other errors are handled by the auth context
    }
  };

  const handleGoToVerification = () => {
    navigate('/verify-email', { state: { email: verificationEmail } });
  };

  const useAdminCredentials = () => {
    setFormData({
      username: ADMIN_USER.username,
      password: ADMIN_USER.password
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Log In
        </Typography>
        
        {error && !needsVerification && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {needsVerification && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Your email is not verified. Please verify your email before logging in.
            <Box mt={1}>
              <Button 
                size="small" 
                variant="outlined"
                onClick={handleGoToVerification}
              >
                Verify Now
              </Button>
            </Box>
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={!!formErrors.username}
            helperText={formErrors.username}
            disabled={loading}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            disabled={loading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          
          <Divider sx={{ my: 2 }}>
            <Chip label="OR" />
          </Divider>
          
          <Box textAlign="center" sx={{ mb: 2 }}>
            <Button 
              variant="outlined" 
              onClick={useAdminCredentials}
              disabled={loading}
            >
              Use Admin Account
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Admin: {ADMIN_USER.username} / {ADMIN_USER.password}
            </Typography>
          </Box>
          
          <Box textAlign="center">
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 