import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem('token');
  });
  
  const [user, setUser] = useState(() => {
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  });

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await authService.checkTokenValidity();
      if (!isValid) {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    
    if (isAuthenticated) {
      checkAuth();
    }
  }, [isAuthenticated]);

  const login = (token: string, userData: any) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 