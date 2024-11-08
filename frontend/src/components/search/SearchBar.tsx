import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ width: '100%' }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search prompts... (e.g. 'Image', 'Code', 'Email')"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit" edge="start">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: { 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'background.paper',
            },
          }
        }}
      />
    </form>
  );
};

export default SearchBar; 