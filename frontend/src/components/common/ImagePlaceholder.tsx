import React from 'react';
import { Box } from '@mui/material';

interface ImagePlaceholderProps {
  width?: number | string;
  height?: number | string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  width = '100%', 
  height = 200 
}) => (
  <Box
    sx={{
      width,
      height,
      bgcolor: 'grey.200',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 1,
    }}
  >
    Prompt Image
  </Box>
);

export default ImagePlaceholder; 