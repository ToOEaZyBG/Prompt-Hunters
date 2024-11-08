import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prompt Hunters API Documentation',
      version,
      description: 'API documentation for Prompt Hunters platform',
      contact: {
        name: 'API Support',
        email: 'support@prompthunters.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.ts'], // Пътища към файловете с route дефиниции
};

export const specs = swaggerJsdoc(options); 