import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  alpha,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PromptCard from '../components/prompts/PromptCard';
import { motion } from 'framer-motion';

// Временни данни за демонстрация
const mockPrompts = [
  {
    id: '1',
    title: 'Professional Email Writer',
    description: 'AI prompt that helps you write professional emails in seconds',
    price: 4.99,
    rating: 4.5,
    category: 'Business',
    imageUrl: undefined,
    isNew: true,
  },
  {
    id: '2',
    title: 'Story Generator',
    description: 'Create engaging stories with detailed plots and characters',
    price: 9.99,
    rating: 4.8,
    category: 'Creative',
    imageUrl: undefined,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'SEO Content Optimizer',
    description: 'Generate SEO-friendly content that ranks well on Google',
    price: 14.99,
    rating: 4.7,
    category: 'Marketing',
    imageUrl: undefined,
  },
];

const SearchResults = () => {
  const theme = useTheme();
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const decodedSearchTerm = searchTerm ? decodeURIComponent(searchTerm) : '';

  // В реалния проект тук ще филтрираме промптовете според търсенето
  const filteredPrompts = mockPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(decodedSearchTerm.toLowerCase()) ||
    prompt.description.toLowerCase().includes(decodedSearchTerm.toLowerCase()) ||
    prompt.category.toLowerCase().includes(decodedSearchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          background: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          position: 'sticky',
          top: 70,
          zIndex: 10,
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Search Results
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Found {filteredPrompts.length} results for "{decodedSearchTerm}"
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Results Grid */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 4, md: 6 },
          minHeight: 'calc(100vh - 70px - 120px)', // navbar height + header height
        }}
      >
        <Grid container spacing={3}>
          {filteredPrompts.map((prompt, index) => (
            <Grid item key={prompt.id} xs={12} sm={6} md={4} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <PromptCard {...prompt} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredPrompts.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 2,
            }}
          >
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ fontWeight: 600 }}
            >
              No results found
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: '500px', mx: 'auto' }}
            >
              Try different keywords or browse our categories
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SearchResults;