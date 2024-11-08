import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  useTheme,
  alpha,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import LockResetIcon from '@mui/icons-material/LockReset';
import { designTokens } from '../../theme/designSystem';

const ResetPassword = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stack spacing={4} sx={{ mb: 8, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LockResetIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              </Box>
            </Box>
            <Typography 
              variant="h3" 
              component="h1"
              sx={{ 
                fontWeight: 800,
                background: designTokens.colors.gradients.primary,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Set New Password
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
              Your new password must be different from previously used passwords and at least 8 characters long.
            </Typography>
          </Stack>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle password reset
            }}
          >
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: designTokens.colors.gradients.primary,
                  '&:hover': {
                    background: designTokens.colors.gradients.primary,
                    opacity: 0.9,
                  },
                }}
              >
                Reset Password
              </Button>

              <Link
                component={RouterLink}
                to="/auth/login"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  color: 'text.secondary',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Back to Login
              </Link>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ResetPassword; 