import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AI_MODELS, getModelIcon } from '../constants/categories';
import NewsletterSection from '../components/newsletter/NewsletterSection';
import { designTokens } from '../theme/designSystem';

const Home = () => {
  const theme = useTheme();

  // Анимация за картите
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
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
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} textAlign="center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    background: designTokens.colors.gradients.primary,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Discover & Share
                  <br />
                  AI Prompts
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                >
                  Explore our curated collection of high-quality prompts for various AI models. 
                  Find the perfect prompt for your next project.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Text AI Models Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 800,
            mb: 2,
          }}
        >
          AI Models
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Text Generation Models
        </Typography>
        <Grid container spacing={3}>
          {Object.values(AI_MODELS)
            .filter(model => model.type === 'text')
            .map((model, index) => (
            <Grid item xs={12} sm={6} md={3} key={model.name}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Card
                  component={RouterLink}
                  to={`/browse/${model.name.toLowerCase()}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 24px ${alpha(theme.palette.info.main, 0.15)}`,
                    },
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          fontSize: '2.5rem',
                          width: 60,
                          height: 60,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: alpha(theme.palette.info.main, 0.1),
                          borderRadius: '16px',
                          mb: 2,
                        }}
                      >
                        {getModelIcon(model.name)}
                      </Box>
                      <Typography variant="h5" component="h3" fontWeight="bold">
                        {model.name}
                      </Typography>
                      
                      {/* Model Stats */}
                      <Stack 
                        direction="row" 
                        spacing={2} 
                        divider={
                          <Divider orientation="vertical" flexItem />
                        }
                        sx={{ 
                          py: 2,
                          px: 1,
                          background: alpha(theme.palette.info.main, 0.05),
                          borderRadius: 2
                        }}
                      >
                        <Stack alignItems="center" width="50%">
                          <Typography 
                            variant="h6" 
                            color="info.main"
                            fontWeight="bold"
                          >
                            {model.categories.length}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            align="center"
                          >
                            Categories
                          </Typography>
                        </Stack>
                        <Stack alignItems="center" width="50%">
                          <Typography 
                            variant="h6" 
                            color="info.main"
                            fontWeight="bold"
                          >
                            {model.stats?.prompts || '450+'}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            align="center"
                          >
                            Prompts
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Sample Categories */}
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: 0.5
                      }}>
                        <Typography variant="body2" color="text.secondary">
                          Popular Categories:
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.primary',
                            fontSize: '0.8rem',
                            lineHeight: 1.4
                          }}
                        >
                          {model.categories.slice(0, 3).join(', ')}...
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Image AI Models Section */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 0, md: 4 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            sx={{ mb: 8 }}
          >
            Image Generation Models
          </Typography>
          <Grid container spacing={3}>
            {Object.values(AI_MODELS)
              .filter(model => model.type === 'image')
              .map((model, index) => (
              <Grid item xs={12} sm={6} md={3} key={model.name}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <Card
                    component={RouterLink}
                    to={`/browse/${model.name.toLowerCase()}`}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 24px ${alpha(theme.palette.success.main, 0.15)}`,
                      },
                    }}
                  >
                    <CardContent>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            fontSize: '2.5rem',
                            width: 60,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: alpha(theme.palette.success.main, 0.1),
                            borderRadius: '16px',
                            mb: 2,
                          }}
                        >
                          {getModelIcon(model.name)}
                        </Box>
                        <Typography variant="h5" component="h3" fontWeight="bold">
                          {model.name}
                        </Typography>
                        
                        {/* Model Stats */}
                        <Stack 
                          direction="row" 
                          spacing={2} 
                          divider={
                            <Divider orientation="vertical" flexItem />
                          }
                          sx={{ 
                            py: 2,
                            px: 1,
                            background: alpha(theme.palette.success.main, 0.05),
                            borderRadius: 2
                          }}
                        >
                          <Stack alignItems="center" width="50%">
                            <Typography 
                              variant="h6" 
                              color="success.main"
                              fontWeight="bold"
                            >
                              {model.categories.length}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              align="center"
                            >
                              Categories
                            </Typography>
                          </Stack>
                          <Stack alignItems="center" width="50%">
                            <Typography 
                              variant="h6" 
                              color="success.main"
                              fontWeight="bold"
                            >
                              {model.stats?.prompts || '450+'}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              align="center"
                            >
                              Prompts
                            </Typography>
                          </Stack>
                        </Stack>

                        {/* Sample Categories */}
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          gap: 0.5
                        }}>
                          <Typography variant="body2" color="text.secondary">
                            Popular Categories:
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'text.primary',
                              fontSize: '0.8rem',
                              lineHeight: 1.4
                            }}
                          >
                            {model.categories.slice(0, 3).join(', ')}...
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              {
                icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
                title: 'Stay Updated',
                description: 'Keep track of the latest trends and updates in AI prompt engineering'
              }
            ].map((feature, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <Stack
                    spacing={2}
                    sx={{
                      textAlign: 'center',
                      p: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '24px',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        color: theme.palette.primary.main,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Stack>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <NewsletterSection />
      </Container>
    </Box>
  );
};

export default Home;