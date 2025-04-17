import React from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Divider,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <AccountCircleIcon color="primary" sx={{ fontSize: 28, mr: 2 }} />
              <Typography variant="h6" component="div">
                Username
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ ml: 5 }}>
              {user.username}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon color="primary" sx={{ fontSize: 28, mr: 2 }} />
              <Typography variant="h6" component="div">
                Email
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ ml: 5 }}>
              {user.email}
            </Typography>
          </CardContent>
        </Card>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Logout'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile; 