// src/pages/Home.js
import React from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    margin: '10px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
  };

  return (
    <Container style={{ marginTop: '80px', textAlign: 'center' }}>
      <h1>Welcome to the Speech Generator</h1>
      <p>Select an option to get started</p>

      <div style={{ marginTop: '40px' }}>
        <button
          style={{ ...buttonStyle, backgroundColor: '#1976d2', color: 'white' }}
          onClick={() => navigate('/speech-form', { state: { fromHome: true } })}
        >
          Start Speech Creation
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: 'orange', color: 'white' }}
          onClick={() => navigate('/load-templates')}
        >
          Load Existing Templates
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: '#4caf50', color: 'white' }}
          onClick={() => navigate('/data-visualization')}
        >
          Data Visualization
        </button>
      </div>
    </Container>
  );
}

export default Home;
