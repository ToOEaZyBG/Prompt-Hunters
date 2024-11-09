import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/index';
import AppRoutes from './routes/index';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
