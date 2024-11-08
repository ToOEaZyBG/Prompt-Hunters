import React from 'react';
import { Box } from '@mui/material';

const GradientBackground = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to right, #3366FF, #4158D0)',
      zIndex: -1,
    }}
  />
);

export default GradientBackground; 