import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

interface SortBarProps {
  onSortChange: (value: string) => void;
  sortBy: string;
}

const SortBar: React.FC<SortBarProps> = ({ onSortChange, sortBy }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} label="Sort By" onChange={handleChange}>
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="price_low">Price: Low to High</MenuItem>
          <MenuItem value="price_high">Price: High to Low</MenuItem>
          <MenuItem value="rating">Highest Rated</MenuItem>
          <MenuItem value="popular">Most Popular</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBar; 