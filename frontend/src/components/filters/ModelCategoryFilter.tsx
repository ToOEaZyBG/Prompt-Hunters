import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { AI_MODELS, getModelIcon, getCategoryIcon } from '../../constants/categories';

interface ModelCategoryFilterProps {
  onModelSelect: (model: string) => void;
  onCategorySelect: (category: string) => void;
  selectedModel: string | null;
  selectedCategories: string[];
}

const ModelCategoryFilter: React.FC<ModelCategoryFilterProps> = ({
  onModelSelect,
  onCategorySelect,
  selectedModel,
  selectedCategories,
}) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  // Филтриране на категории според търсенето
  const filterCategories = (categories: string[]) => {
    if (!searchTerm) return categories;
    return categories.filter(category => 
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
      {/* Търсачка за категории */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Image Models */}
      <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>
        Image Models
      </Typography>
      <Stack spacing={1} sx={{ mb: 3 }}>
        {Object.values(AI_MODELS)
          .filter(model => model.type === 'image')
          .map(model => (
            <Accordion
              key={model.name}
              expanded={selectedModel === model.name}
              onChange={() => onModelSelect(model.name)}
              elevation={0}
              sx={{
                '&:before': { display: 'none' },
                bgcolor: selectedModel === model.name 
                  ? alpha(theme.palette.primary.main, 0.08)
                  : 'transparent',
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  minHeight: 48,
                  '& .MuiAccordionSummary-content': { my: 0 },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{getModelIcon(model.name)}</span>
                  <Typography>{model.name}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {filterCategories(model.categories).map(category => (
                    <Chip
                      key={category}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <span>{getCategoryIcon(category)}</span>
                          {category}
                        </Box>
                      }
                      onClick={() => onCategorySelect(category)}
                      variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                      color={selectedCategories.includes(category) ? "primary" : "default"}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
      </Stack>

      {/* Text Models */}
      <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>
        Text Models
      </Typography>
      <Stack spacing={1}>
        {Object.values(AI_MODELS)
          .filter(model => model.type === 'text')
          .map(model => (
            <Accordion
              key={model.name}
              expanded={selectedModel === model.name}
              onChange={() => onModelSelect(model.name)}
              elevation={0}
              sx={{
                '&:before': { display: 'none' },
                bgcolor: selectedModel === model.name 
                  ? alpha(theme.palette.primary.main, 0.08)
                  : 'transparent',
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  minHeight: 48,
                  '& .MuiAccordionSummary-content': { my: 0 },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{getModelIcon(model.name)}</span>
                  <Typography>{model.name}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {filterCategories(model.categories).map(category => (
                    <Chip
                      key={category}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <span>{getCategoryIcon(category)}</span>
                          {category}
                        </Box>
                      }
                      onClick={() => onCategorySelect(category)}
                      variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                      color={selectedCategories.includes(category) ? "primary" : "default"}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
      </Stack>
    </Paper>
  );
};

export default ModelCategoryFilter; 