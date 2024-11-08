import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your new password')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

interface ChangePasswordFormProps {
  onSubmit: (values: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setError(null);
        await onSubmit({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });
        setSuccess('Password changed successfully');
        resetForm();
      } catch (err: any) {
        setError(err.message || 'Failed to change password');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LockIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Change Password
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                {...formik.getFieldProps('currentPassword')}
                error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                helperText={formik.touched.currentPassword && formik.errors.currentPassword}
              />

              <TextField
                fullWidth
                type="password"
                label="New Password"
                {...formik.getFieldProps('newPassword')}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
              />

              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                {...formik.getFieldProps('confirmPassword')}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
                sx={{
                  py: 1.5,
                  background: theme.palette.primary.main,
                  '&:hover': {
                    background: theme.palette.primary.dark,
                  },
                }}
              >
                Change Password
              </Button>
            </Stack>
          </form>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm; 