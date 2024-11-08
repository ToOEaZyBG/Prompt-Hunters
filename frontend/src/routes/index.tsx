import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Browse from '../pages/Browse';
import ModelPage from '../pages/ModelPage';
import SearchResults from '../pages/SearchResults';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Profile from '../pages/auth/Profile';
import { PrivateRoute } from '../components/PrivateRoute';
import { useAuth } from '../contexts/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Публични routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/browse" element={<Layout><Browse /></Layout>} />
      <Route path="/browse/:modelName" element={<Layout><ModelPage /></Layout>} />
      <Route path="/search/:searchTerm" element={<Layout><SearchResults /></Layout>} />
      
      {/* Auth routes */}
      <Route 
        path="/auth/login" 
        element={
          isAuthenticated ? 
          <Navigate to="/" replace /> : 
          <Login />
        } 
      />
      <Route 
        path="/auth/register" 
        element={
          isAuthenticated ? 
          <Navigate to="/" replace /> : 
          <Register />
        } 
      />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />

      {/* Защитени routes */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Layout>
              <Profile />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes; 