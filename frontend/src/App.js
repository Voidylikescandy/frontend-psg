import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/common/Header';
import SpeechForm from './pages/SpeechForm';
import SpeechEdit from './pages/SpeechEdit';
import SpeechAnalysis from './pages/SpeechAnalysis';
import SpeechTranslate from './pages/SpeechTranslate';
import DataVisualization from './pages/DataVisualization';
import Home from './pages/Home';
import LoadTemplates from './pages/LoadTemplates';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerification from './pages/EmailVerification';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './utils/authContext';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      marginBottom: '1rem',
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      
      {/* Protected routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/speech-form" 
        element={
          <ProtectedRoute>
            <SpeechForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/speech-edit" 
        element={
          <ProtectedRoute>
            <SpeechEdit />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/speech-analysis" 
        element={
          <ProtectedRoute>
            <SpeechAnalysis />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/speech-translate" 
        element={
          <ProtectedRoute>
            <SpeechTranslate />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/data-visualization" 
        element={
          <ProtectedRoute>
            <DataVisualization />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/load-templates" 
        element={
          <ProtectedRoute>
            <LoadTemplates />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      {/* Redirect all other routes to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Header />
          <div className="container">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 