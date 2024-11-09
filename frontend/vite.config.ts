import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      }
    },
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделяме vendor библиотеките
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui': ['@mui/material', '@mui/icons-material'],
          'vendor-utils': ['formik', 'yup', 'axios'],
          'vendor-animations': ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/assets': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        secure: false,
      }
    },
  },
});
