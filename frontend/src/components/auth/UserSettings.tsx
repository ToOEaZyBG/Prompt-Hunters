import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
  Divider,
  useTheme,
  alpha,
  Box,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const UserSettings = () => {
  const theme = useTheme();

  const settings = [
    {
      icon: <NotificationsIcon color="primary" />,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      options: [
        { label: 'Email Notifications', value: true },
        { label: 'Push Notifications', value: false },
        { label: 'Marketing Emails', value: false },
      ],
    },
    {
      icon: <SecurityIcon color="primary" />,
      title: 'Privacy',
      description: 'Control your privacy settings',
      options: [
        { label: 'Profile Visibility', value: true },
        { label: 'Show Online Status', value: true },
        { label: 'Two-Factor Authentication', value: false },
      ],
    },
    {
      icon: <LanguageIcon color="primary" />,
      title: 'Language & Region',
      description: 'Set your preferred language and region',
      options: [
        { label: 'Use Browser Language', value: true },
        { label: 'Show Prices in USD', value: true },
      ],
    },
    {
      icon: <DarkModeIcon color="primary" />,
      title: 'Appearance',
      description: 'Customize your visual experience',
      options: [
        { label: 'Dark Mode', value: false },
        { label: 'High Contrast', value: false },
      ],
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          {settings.map((section, index) => (
            <React.Fragment key={section.title}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {section.icon}
                  <div>
                    <Typography variant="h6" fontWeight="bold">
                      {section.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {section.description}
                    </Typography>
                  </div>
                </Box>

                <Stack spacing={1}>
                  {section.options.map((option) => (
                    <FormControlLabel
                      key={option.label}
                      control={
                        <Switch
                          defaultChecked={option.value}
                          onChange={(e) => {
                            // TODO: Имплементирайте промяна на настройките
                            console.log(`${option.label} changed to:`, e.target.checked);
                          }}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </Stack>
              </Stack>
              {index < settings.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserSettings; 