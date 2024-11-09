import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

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
    const token = sessionStorage.getItem('token');
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
      const url = `${API_URL}/register`;
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
      console.log('Login attempt for:', credentials.email);

      const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });
      
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login failed');
      throw error;
    }
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }

  getCurrentUser() {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async checkTokenValidity(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Правим заявка към backend-а за да проверим токена
      await axios.get(`${API_URL}/check-token`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch {
      return false;
    }
  }
}

export default new AuthService(); 