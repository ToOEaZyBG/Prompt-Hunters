import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  useTheme,
  alpha,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import { AI_MODELS, getModelIcon } from '../constants/categories';
import PromptCard from '../components/prompts/PromptCard';

// Временни данни за демонстрация
const mockPrompts = [
  {
    id: '1',
    title: 'Professional Email Writer',
    description: 'AI prompt that helps you write professional emails in seconds',
    price: 4.99,
    rating: 4.5,
    category: 'Business',
    imageUrl: 'https://source.unsplash.com/random/800x600/?email',
    isNew: true,
  },
  // ... добавете още примерни промпти
];

const ModelPage = () => {
  const theme = useTheme();
  const { modelName } = useParams<{ modelName: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Намираме модела от константите
  const model = Object.values(AI_MODELS).find(
    m => m.name.toLowerCase() === modelName?.toLowerCase()
  );

  if (!model) {
    return (
      <Container>
        <Typography variant="h4">Model not found</Typography>
      </Container>
    );
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          py: 6,
          mb: 6,
          borderRadius: 4,
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(theme.palette.secondary.main, 0.8)} 100%)`,
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Box
                  sx={{
                    fontSize: '3rem',
                    width: 64,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: alpha('#fff', 0.2),
                    borderRadius: 2,
                  }}
                >
                  {getModelIcon(model.name)}
                </Box>
                <Typography variant="h3" component="h1" fontWeight="bold">
                  {model.name} Prompts
                </Typography>
              </Stack>
              <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                {model.type === 'image' 
                  ? 'Create stunning visuals with our curated collection of image generation prompts'
                  : 'Enhance your writing and productivity with our powerful text generation prompts'}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Search & Categories */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <TextField
          fullWidth
          placeholder={`Search ${model.name} prompts...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />

        <Typography variant="h6" gutterBottom>
          Popular Categories
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
          {model.categories.slice(0, 20).map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip
                label={category}
                onClick={() => handleCategoryClick(category)}
                variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                color={selectedCategories.includes(category) ? "primary" : "default"}
                sx={{ m: 0.5 }}
              />
            </motion.div>
          ))}
        </Stack>
      </Container>

      {/* Prompts Grid */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {mockPrompts.map((prompt) => (
            <Grid item key={prompt.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PromptCard {...prompt} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default ModelPage; 