import React from 'react';
import { Box, Grid, Typography, Button, alpha, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 8,
        p: 4,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/pattern.svg") repeat',
          opacity: 0.05,
          zIndex: 1,
        },
      }}
    >
      <Grid container spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Join Our Newsletter
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Get weekly updates about the latest AI models, trending prompts, and exclusive offers.
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                // Handle newsletter subscription
              }}
              sx={{
                display: 'flex',
                gap: 1,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -2,
                  background: theme.palette.primary.main,
                  borderRadius: '14px',
                  opacity: 0.1,
                  transition: 'opacity 0.3s ease',
                },
                '&:hover::before': {
                  opacity: 0.15,
                },
              }}
            >
              <Box
                component="input"
                sx={{
                  flex: 1,
                  px: 2,
                  py: 1.5,
                  borderRadius: '12px',
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  bgcolor: 'background.paper',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  '&:focus': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
                  },
                  '&::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 0.7,
                  },
                }}
                placeholder="Enter your email"
              />
              <Button
                variant="contained"
                type="submit"
                endIcon={<SendIcon />}
                sx={{
                  px: 3,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                  '&:hover': {
                    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsletterSection; 