import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AI_MODELS, getModelIcon } from '../constants/categories';

// Създаваме тип за статистиката
type ModelStats = {
  uses: number;
  trend: string;
};

// Създаваме тип за обекта със статистики
type ModelStatsMap = {
  [key: string]: ModelStats;
};

// Временни данни за статистика (ще бъдат заменени с реални данни от API)
const modelStats: ModelStatsMap = {
  'Midjourney': { uses: 15234, trend: '+12%' },
  'DALL·E': { uses: 12453, trend: '+8%' },
  'Stable Diffusion': { uses: 10234, trend: '+15%' },
  'Leonardo AI': { uses: 9876, trend: '+10%' },
  'FLUX': { uses: 7654, trend: '+7%' },
  'GPT': { uses: 18453, trend: '+20%' },
  'Claude': { uses: 8234, trend: '+5%' },
  'Llama': { uses: 6543, trend: '+9%' },
  'Mistral': { uses: 5432, trend: '+6%' },
};

const topCategories = [
  { name: 'Art & Illustration', count: 1234 },
  { name: 'Logo Design', count: 987 },
  { name: 'Business Writing', count: 876 },
  { name: 'Code Generation', count: 765 },
  { name: '3D Modeling', count: 654 },
];

const Browse = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Browse AI Models
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover prompts for your favorite AI models
        </Typography>
      </Box>

      {/* AI Models Grid */}
      <Grid container spacing={4}>
        {/* Image Models */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ ml: 2 }}>
            Image Models
          </Typography>
          <Grid container spacing={3}>
            {Object.values(AI_MODELS)
              .filter(model => model.type === 'image')
              .map(model => (
                <Grid item xs={12} sm={6} md={4} key={model.name}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() => navigate(`/browse/${model.name.toLowerCase()}`)}
                        sx={{ height: '100%', p: 2 }}
                      >
                        <CardContent>
                          <Stack spacing={2}>
                            {/* Model Icon & Name */}
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Box
                                sx={{
                                  fontSize: '2rem',
                                  width: 48,
                                  height: 48,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {getModelIcon(model.name)}
                              </Box>
                              <Box>
                                <Typography variant="h5" gutterBottom>
                                  {model.name}
                                </Typography>
                                {modelStats[model.name] ? (
                                  <>
                                    <Typography variant="body2" color="success.main">
                                      {modelStats[model.name]?.trend} this month
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {modelStats[model.name]?.uses.toLocaleString()} prompts used
                                    </Typography>
                                  </>
                                ) : (
                                  <Typography variant="body2" color="text.secondary">
                                    No stats available
                                  </Typography>
                                )}
                              </Box>
                            </Stack>

                            {/* Model Variants */}
                            {model.variants.length > 0 && (
                              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {model.variants.map(variant => (
                                  <Chip
                                    key={variant}
                                    label={variant}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                                      my: 0.5,
                                    }}
                                  />
                                ))}
                              </Stack>
                            )}
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
          </Grid>
        </Grid>

        {/* Text Models */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ ml: 2 }}>
            Text Models
          </Typography>
          <Grid container spacing={3}>
            {Object.values(AI_MODELS)
              .filter(model => model.type === 'text')
              .map(model => (
                <Grid item xs={12} sm={6} md={4} key={model.name}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                        '&:hover': {
                          borderColor: theme.palette.secondary.main,
                          boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.15)}`,
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() => navigate(`/browse/${model.name.toLowerCase()}`)}
                        sx={{ height: '100%', p: 2 }}
                      >
                        <CardContent>
                          <Stack spacing={2}>
                            {/* Model Icon & Name */}
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Box
                                sx={{
                                  fontSize: '2rem',
                                  width: 48,
                                  height: 48,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {getModelIcon(model.name)}
                              </Box>
                              <Box>
                                <Typography variant="h5" gutterBottom>
                                  {model.name}
                                </Typography>
                                {modelStats[model.name] ? (
                                  <>
                                    <Typography variant="body2" color="success.main">
                                      {modelStats[model.name]?.trend} this month
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {modelStats[model.name]?.uses.toLocaleString()} prompts used
                                    </Typography>
                                  </>
                                ) : (
                                  <Typography variant="body2" color="text.secondary">
                                    No stats available
                                  </Typography>
                                )}
                              </Box>
                            </Stack>

                            {/* Model Variants */}
                            {model.variants.length > 0 && (
                              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {model.variants.map(variant => (
                                  <Chip
                                    key={variant}
                                    label={variant}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                      my: 0.5,
                                    }}
                                  />
                                ))}
                              </Stack>
                            )}
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
          </Grid>
        </Grid>

        {/* Top Categories */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ ml: 2 }}>
            Top Categories
          </Typography>
          <Grid container spacing={3}>
            {topCategories.map((category) => (
              <Grid item xs={12} sm={6} md={2.4} key={category.name}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                      border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                      '&:hover': {
                        borderColor: theme.palette.info.main,
                        boxShadow: `0 8px 24px ${alpha(theme.palette.info.main, 0.15)}`,
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => navigate(`/browse/all/${category.name.toLowerCase()}`)}
                      sx={{ height: '100%', p: 2 }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {category.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {category.count.toLocaleString()} prompts
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Browse; 