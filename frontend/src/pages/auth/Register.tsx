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
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { designTokens } from '../../theme/designSystem';
import authService from '../../services/auth.service';

// Схема за валидация
const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log('Attempting registration with values:', values);
        
        const response = await authService.register({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        });

        console.log('Registration successful:', response);
        
        navigate('/auth/login');
      } catch (error: any) {
        console.error('Registration error:', error);
        const errorMessage = error.response?.data?.message || 
                            error.message || 
                            'Registration failed';
        setError(errorMessage);
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
                <PersonAddIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
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
              Create an Account
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
              Join our community of prompt engineers and start sharing your expertise with the world.
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

              {/* Registration Form */}
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...formik.getFieldProps('firstName')}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.paper',
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...formik.getFieldProps('lastName')}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.paper',
                      },
                    }}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...formik.getFieldProps('confirmPassword')}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                    },
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox 
                      {...formik.getFieldProps('terms')}
                      checked={formik.values.terms}
                      sx={{
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      I agree to the{' '}
                      <Link component={RouterLink} to="/terms" color="primary">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link component={RouterLink} to="/privacy" color="primary">
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                />
                {formik.touched.terms && formik.errors.terms && (
                  <Typography color="error" variant="caption">
                    {formik.errors.terms}
                  </Typography>
                )}

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
                  Create Account
                </Button>

                {/* Login Link */}
                <Stack direction="row" spacing={0.5} justifyContent="center">
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?
                  </Typography>
                  <Link
                    component={RouterLink}
                    to="/auth/login"
                    color="primary"
                    sx={{ 
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    Sign in
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;