import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert,
  CircularProgress,
  Link
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Get email from location state passed during registration
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If no email is provided, redirect to register
      navigate('/register');
    }
  }, [location.state, navigate]);
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  const handleOtpChange = (e) => {
    setOtp(e.target.value.trim());
    if (error) setError(null);
  };
  
  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!otp) {
      setError('Please enter the verification code');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_URL}/api/auth/verify-email`, {
        email,
        otp
      });
      
      setSuccess(true);
      
      // Redirect to login after successful verification
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Verification failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendOtp = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await axios.post(`${API_URL}/api/auth/resend-otp`, { email });
      
      // Start countdown for resend button (60 seconds)
      setCountdown(60);
      
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to resend verification code';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Verify Your Email
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Email verified successfully! Redirecting to login...
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleVerify} noValidate>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We've sent a verification code to <strong>{email}</strong>. 
            Please enter it below to verify your account.
          </Typography>
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="Verification Code"
            name="otp"
            autoComplete="one-time-code"
            autoFocus
            value={otp}
            onChange={handleOtpChange}
            disabled={loading || success}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || success}
          >
            {loading ? <CircularProgress size={24} /> : 'Verify Email'}
          </Button>
          
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Button
              variant="text"
              onClick={handleResendOtp}
              disabled={loading || countdown > 0 || success}
            >
              {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend verification code'}
            </Button>
          </Box>
          
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Back to{' '}
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmailVerification; 