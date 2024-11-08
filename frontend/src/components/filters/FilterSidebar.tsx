import React from 'react';
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  useTheme,
  alpha,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PROMPT_CATEGORIES, AI_MODELS, PROMPT_TYPES, getCategoryIcon } from '../../constants/categories';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterSidebarProps {
  onPriceChange: (value: number[]) => void;
  onCategoryChange: (category: string) => void;
  onModelChange: (model: string) => void;
  onTypeChange: (type: string) => void;
  selectedCategories: string[];
  selectedModels: string[];
  selectedTypes: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onPriceChange,
  onCategoryChange,
  onModelChange,
  onTypeChange,
  selectedCategories,
  selectedModels,
  selectedTypes,
}) => {
  const theme = useTheme();

  const promptTypes = Object.values(PROMPT_TYPES) as string[];
  const categories = Object.entries(PROMPT_CATEGORIES) as [string, string][];

  return (
    <Paper 
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: theme.palette.background.paper,
        position: 'sticky',
        top: 24,
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight="600" sx={{ mb: 3 }}>
        Filters
      </Typography>

      {/* Типове промптове */}
      <Accordion 
        defaultExpanded
        elevation={0}
        sx={{
          background: 'transparent',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{
            '& .MuiAccordionSummary-content': { my: 0 },
            px: 0,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>Prompt Types</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <Stack spacing={1}>
            {promptTypes.map((type) => (
              <motion.div
                key={type}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes(type)}
                      onChange={() => onTypeChange(type)}
                      sx={{
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: selectedTypes.includes(type) ? 600 : 400,
                        color: selectedTypes.includes(type) 
                          ? theme.palette.text.primary 
                          : theme.palette.text.secondary,
                      }}
                    >
                      {type}
                    </Typography>
                  }
                />
              </motion.div>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Категории */}
      <Accordion 
        defaultExpanded
        elevation={0}
        sx={{
          background: 'transparent',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{
            '& .MuiAccordionSummary-content': { my: 0 },
            px: 0,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <Stack spacing={1}>
            {categories.map(([key, category]) => (
              <motion.div
                key={category}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={() => onCategoryChange(category)}
                      sx={{
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{getCategoryIcon(key as keyof typeof PROMPT_CATEGORIES)}</span>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: selectedCategories.includes(category) ? 600 : 400,
                          color: selectedCategories.includes(category) 
                            ? theme.palette.text.primary 
                            : theme.palette.text.secondary,
                        }}
                      >
                        {category}
                      </Typography>
                    </Box>
                  }
                />
              </motion.div>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* AI Models */}
      <Accordion 
        defaultExpanded
        elevation={0}
        sx={{
          background: 'transparent',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{
            '& .MuiAccordionSummary-content': { my: 0 },
            px: 0,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>AI Models</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          {/* Image Models */}
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Image Models
          </Typography>
          <Stack spacing={1} sx={{ mb: 3 }}>
            {Object.values(AI_MODELS)
              .filter(model => model.type === 'image')
              .map(model => (
                <Box key={model.name}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedModels.includes(model.name)}
                          onChange={() => onModelChange(model.name)}
                          sx={{
                            '&.Mui-checked': {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: selectedModels.includes(model.name) ? 600 : 400,
                            color: selectedModels.includes(model.name) 
                              ? theme.palette.text.primary 
                              : theme.palette.text.secondary,
                          }}
                        >
                          {model.name}
                        </Typography>
                      }
                    />
                  </motion.div>
                  <AnimatePresence>
                    {model.variants.map(variant => (
                      <motion.div
                        key={variant}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <FormControlLabel
                          sx={{ ml: 4 }}
                          control={
                            <Checkbox
                              size="small"
                              checked={selectedModels.includes(variant)}
                              onChange={() => onModelChange(variant)}
                              sx={{
                                '&.Mui-checked': {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '0.875rem',
                                fontWeight: selectedModels.includes(variant) ? 600 : 400,
                                color: selectedModels.includes(variant) 
                                  ? theme.palette.text.primary 
                                  : theme.palette.text.secondary,
                              }}
                            >
                              {variant}
                            </Typography>
                          }
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Box>
              ))}
          </Stack>

          {/* Text Models */}
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Text Models
          </Typography>
          <Stack spacing={1}>
            {Object.values(AI_MODELS)
              .filter(model => model.type === 'text')
              .map(model => (
                <Box key={model.name}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedModels.includes(model.name)}
                          onChange={() => onModelChange(model.name)}
                          sx={{
                            '&.Mui-checked': {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: selectedModels.includes(model.name) ? 600 : 400,
                            color: selectedModels.includes(model.name) 
                              ? theme.palette.text.primary 
                              : theme.palette.text.secondary,
                          }}
                        >
                          {model.name}
                        </Typography>
                      }
                    />
                  </motion.div>
                  <AnimatePresence>
                    {model.variants.map(variant => (
                      <motion.div
                        key={variant}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <FormControlLabel
                          sx={{ ml: 4 }}
                          control={
                            <Checkbox
                              size="small"
                              checked={selectedModels.includes(variant)}
                              onChange={() => onModelChange(variant)}
                              sx={{
                                '&.Mui-checked': {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '0.875rem',
                                fontWeight: selectedModels.includes(variant) ? 600 : 400,
                                color: selectedModels.includes(variant) 
                                  ? theme.palette.text.primary 
                                  : theme.palette.text.secondary,
                              }}
                            >
                              {variant}
                            </Typography>
                          }
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Box>
              ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Ценови диапазон */}
      <Box sx={{ px: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
          Price Range
        </Typography>
        <Slider
          defaultValue={[0, 100]}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          onChange={(_, value) => onPriceChange(value as number[])}
          sx={{
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.1)}`,
              },
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">$0</Typography>
          <Typography variant="body2" color="text.secondary">$100</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default FilterSidebar; 