import swaggerJsdoc from 'swagger-jsdoc';
import { productSwaggerSchema } from '@models/swagger/product.swagger.model';
import { productMessageSwaggerSchema } from '@models/swagger/product-message.swagger.model';
import { productErrorMessageSwaggerSchema } from '@models/swagger/product-error-message.swagger.model';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Product microservice API',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from a microservice.',
  },
  components: {
    schemas: {
      ...productSwaggerSchema,
      ...productErrorMessageSwaggerSchema,
      ...productMessageSwaggerSchema,
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
