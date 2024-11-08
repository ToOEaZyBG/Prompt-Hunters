import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

// Добавяме axios interceptor за автоматично добавяне на токена
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class AuthService {
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    try {
      const url = `${API_URL}/auth/register`;
      console.log('Sending registration request to:', url);
      console.log('With data:', userData);

      const response = await axios.post(url, userData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Full registration error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      throw error;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Attempting login with:', credentials);
      console.log('API URL:', `${API_URL}/auth/login`);

      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      
      console.log('Login response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Full login error:', error);
      if (error.response) {
        console.error('Login error response:', error.response.data);
        console.error('Login error status:', error.response.status);
        console.error('Login error headers:', error.response.headers);
        throw new Error(error.response.data.message || 'Invalid email or password');
      } else if (error.request) {
        console.error('Login request error:', error.request);
        throw new Error('No response from server. Please try again later.');
      } else {
        console.error('Login error:', error.message);
        throw new Error('Error occurred while logging in. Please try again.');
      }
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService(); 