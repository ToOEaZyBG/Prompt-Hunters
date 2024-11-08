import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Container,
  useTheme,
  alpha,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from '../search/SearchBar';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import { useAuth } from '../../contexts/AuthContext';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsDrawer from '../auth/SettingsDrawer';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          background: `linear-gradient(to bottom, ${alpha(theme.palette.background.default, 0.9)}, ${alpha(theme.palette.background.default, 0.8)})`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              minHeight: 70,
              gap: 2
            }}
          >
            {/* Logo */}
            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  color: 'primary.dark',
                },
              }}
            >
              <SparklesIcon sx={{ fontSize: 28 }} />
              Prompt Hunters
            </Typography>

            {/* Search Bar */}
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              justifyContent: 'center',
              maxWidth: 600,
              mx: 'auto'
            }}>
              <SearchBar />
            </Box>

            {/* Auth Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isAuthenticated ? (
                <>
                  <IconButton
                    onClick={() => navigate('/profile')}
                    size="small"
                    sx={{ 
                      border: '2px solid',
                      borderColor: alpha(theme.palette.divider, 0.1),
                      borderRadius: '12px',
                      p: 1,
                    }}
                  >
                    <Avatar 
                      src={user?.avatar_url}
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: theme.palette.primary.main,
                        fontSize: '1rem',
                      }}
                    >
                      {user?.firstName?.[0]}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{ mt: 1 }}
                  >
                    <MenuItem onClick={() => {
                      handleClose();
                      navigate('/profile');
                    }}>
                      <AccountCircleIcon sx={{ mr: 1 }} />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => {
                      handleClose();
                      setSettingsOpen(true);
                    }}>
                      <SettingsIcon sx={{ mr: 1 }} />
                      Settings
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={RouterLink}
                    to="/auth/login"
                    variant="outlined"
                    sx={{ borderRadius: '12px' }}
                  >
                    Login
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/auth/register"
                    variant="contained"
                    sx={{ borderRadius: '12px' }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Добавяме drawer за настройките */}
      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default Navbar;