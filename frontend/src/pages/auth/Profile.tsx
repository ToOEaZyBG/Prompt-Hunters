import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  TextField,
  useTheme,
  alpha,
  Alert,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ChangePasswordForm from '../../components/auth/ChangePasswordForm';
import AvatarUpload from '../../components/auth/AvatarUpload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserSettings from '../../components/auth/UserSettings';
import UserMenu from '../../components/auth/UserMenu';

// Добавяме интерфейс за формата
interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Profile = () => {
  const theme = useTheme();
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState('profile');

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // TODO: Имплементирайте API заявка за обновяване на профила
        login(localStorage.getItem('token') || '', {
          ...user,
          ...values,
        });
        setIsEditing(false);
        setError(null);
      } catch (error: any) {
        setError(error.message || 'Failed to update profile');
      }
    },
  });

  // Функция за рендериране на съдържанието според избраното меню
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'profile':
        return (
          <Stack spacing={3}>
            {/* Съществуващата форма за профил */}
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EditIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Profile Information
                    </Typography>
                  </Box>

                  {error && (
                    <Alert severity="error" onClose={() => setError(null)}>
                      {error}
                    </Alert>
                  )}

                  <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="First Name"
                            {...formik.getFieldProps('firstName')}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName || ' '}
                            disabled={!isEditing}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            {...formik.getFieldProps('lastName')}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName || ' '}
                            disabled={!isEditing}
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        fullWidth
                        label="Email"
                        {...formik.getFieldProps('email')}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email || ' '}
                        disabled={!isEditing}
                      />
                    </Stack>
                  </form>
                </Stack>
              </CardContent>
            </Card>
            <ChangePasswordForm onSubmit={async (values) => {
              console.log('Changing password:', values);
            }} />
          </Stack>
        );
      case 'settings':
        return <UserSettings />;
      case 'subscription':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6">Subscription Details</Typography>
              {/* Добавете съдържание за абонамента */}
            </CardContent>
          </Card>
        );
      case 'bought-prompts':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6">Bought Prompts</Typography>
              {/* Добавете списък с купени промпти */}
            </CardContent>
          </Card>
        );
      case 'rented-prompts':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6">Rented Prompts</Typography>
              {/* Добавете списък с наети промпти */}
            </CardContent>
          </Card>
        );
      case 'favorites':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6">Favorite Prompts</Typography>
              {/* Добавете списък с любими промпти */}
            </CardContent>
          </Card>
        );
      case 'history':
        return (
          <Card>
            <CardContent>
              <Typography variant="h6">History</Typography>
              {/* Добавете история на действията */}
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Лява колона - Меню */}
        <Grid item xs={12} md={3}>
          {/* Профилна информация */}
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <AvatarUpload
                  currentAvatar={user?.avatar_url}
                  onUpload={async (file) => {
                    const formData = new FormData();
                    formData.append('avatar', file, file.name);
                    
                    try {
                      const response = await axios.post('/api/auth/avatar', formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                      });
                      
                      login(localStorage.getItem('token') || '', {
                        ...user,
                        avatar_url: response.data.avatar.url,
                        avatar_path: response.data.avatar.path,
                      });
                    } catch (error) {
                      console.error('Failed to upload avatar:', error);
                    }
                  }}
                />
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Меню */}
          <UserMenu
            selectedItem={selectedMenuItem}
            onItemSelect={setSelectedMenuItem}
          />
        </Grid>

        {/* Дясна колона - Съдържание */}
        <Grid item xs={12} md={9}>
          {renderContent()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;