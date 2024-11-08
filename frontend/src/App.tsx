import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/index';
import AppRoutes from './routes/index';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
