import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  useTheme,
  alpha,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LoginIcon from '@mui/icons-material/Login';
import { designTokens } from '../../theme/designSystem';
import authService from '../../services/auth.service';
import { useAuth } from '../../contexts/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log('Attempting login with:', values);
        
        const response = await authService.login({
          email: values.email,
          password: values.password,
        });

        console.log('Login successful:', response);
        
        // Използваме контекста за логин
        login(response.token, response.user);
        
        // Пренасочване към началната страница
        navigate('/');
      } catch (error: any) {
        console.error('Login failed:', error);
        setError(error.message || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const socialLogins = [
    { icon: <GoogleIcon />, name: 'Google', color: '#EA4335' },
    { icon: <GitHubIcon />, name: 'GitHub', color: '#333333' },
    { icon: <TwitterIcon />, name: 'Twitter', color: '#1DA1F2' },
  ];

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
                <LoginIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
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
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
              Sign in to access your account, manage your prompts, and continue exploring the world of AI.
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Stack spacing={3}>
              {/* Social Login Buttons */}
              <Stack direction="row" spacing={2}>
                {socialLogins.map((social) => (
                  <motion.div
                    key={social.name}
                    whileHover={{ y: -4 }}
                    style={{ flex: 1 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      disabled={formik.isSubmitting}
                      sx={{
                        py: 1.5,
                        borderColor: alpha(social.color, 0.2),
                        color: social.color,
                        '&:hover': {
                          borderColor: social.color,
                          backgroundColor: alpha(social.color, 0.05),
                        },
                      }}
                    >
                      {social.icon}
                    </Button>
                  </motion.div>
                ))}
              </Stack>

              {/* Divider */}
              <Box sx={{ position: 'relative', my: 3 }}>
                <Divider>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      px: 2,
                      color: 'text.secondary',
                      bgcolor: 'background.default',
                    }}
                  >
                    or continue with email
                  </Typography>
                </Divider>
              </Box>

              {/* Login Form */}
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={formik.isSubmitting}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...formik.getFieldProps('password')}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  disabled={formik.isSubmitting}
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
                  disabled={formik.isSubmitting}
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
                  {formik.isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Sign in'
                  )}
                </Button>

                {/* Links */}
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Link
                    component={RouterLink}
                    to="/auth/forgot-password"
                    color="primary"
                    sx={{ 
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Forgot password?
                  </Link>
                  <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?
                    </Typography>
                    <Link
                      component={RouterLink}
                      to="/auth/register"
                      color="primary"
                      sx={{ 
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Sign up
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;