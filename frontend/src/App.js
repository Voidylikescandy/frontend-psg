import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/common/Header';
import CandidateProfile from './pages/CandidateProfile';
import SpeechParameters from './pages/SpeechParameters';
import SpeechEdit from './pages/SpeechEdit';
import SpeechAnalysis from './pages/SpeechAnalysis';
import DataVisualization from './pages/DataVisualization';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<CandidateProfile />} />
            <Route path="/speech-parameters" element={<SpeechParameters />} />
            <Route path="/speech-edit" element={<SpeechEdit />} />
            <Route path="/speech-analysis" element={<SpeechAnalysis />} />
            <Route path="/data-visualization" element={<DataVisualization />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 