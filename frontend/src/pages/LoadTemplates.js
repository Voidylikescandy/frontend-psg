// src/pages/LoadTemplates.js
import React from 'react';
import { Container, Typography } from '@mui/material';

function LoadTemplates() {
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Load Existing Templates
      </Typography>
      <Typography variant="body1">
        This page will let you upload and manage templates. (Coming soon!)
      </Typography>
    </Container>
  );
}

export default LoadTemplates;
