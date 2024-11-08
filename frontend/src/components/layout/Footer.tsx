import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Социални медии икони
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const theme = useTheme();
  
  const socialLinks = [
    { icon: <GitHubIcon />, name: 'GitHub', url: 'https://github.com/prompthunter' },
    { icon: <TwitterIcon />, name: 'Twitter', url: 'https://twitter.com/prompthunter' },
    { icon: <LinkedInIcon />, name: 'LinkedIn', url: 'https://linkedin.com/company/prompthunter' },
    { icon: <FacebookIcon />, name: 'Facebook', url: 'https://facebook.com/prompthunter' },
    { icon: <InstagramIcon />, name: 'Instagram', url: 'https://instagram.com/prompthunter' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          {/* Компания и Правни */}
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={3}>
              <Link component={RouterLink} to="/about" color="inherit">About</Link>
              <Link component={RouterLink} to="/contact" color="inherit">Contact</Link>
              <Link component={RouterLink} to="/privacy" color="inherit">Privacy</Link>
              <Link component={RouterLink} to="/terms" color="inherit">Terms</Link>
            </Stack>
          </Grid>

          {/* Социални медии */}
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-end' }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  component={Link}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Копирайт */}
          <Grid item xs={12}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
              sx={{ mt: 2 }}
            >
              © {new Date().getFullYear()} Prompt Hunters. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;