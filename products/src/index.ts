import dotenv from 'dotenv';
import helmet from 'helmet';
import express from 'express';
import 'module-alias/register';
import logger from '@utils/logger.js';
import { connectDB } from '@config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@config/swagger.js';
import mainRoute from '@routes/main.route.js';
import { rateLimiter } from '@middlewares/rateLimiter';
import errorHandler from '@middlewares/errorHandler.js';
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

/*
 * Security enhancements
 * Apply Helmet,
 * Rate and
 * Body Parser Limiter middlewares
 */
app.use(helmet());
app.use(rateLimiter);
app.use(bodyParser.json({ limit: '1mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '1mb',
    extended: false,
    parameterLimit: 5,
  })
);

// Register middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize database connection
connectDB();

// Use the routes from mainRoute.js
app.use(mainRoute);

// Register global error handling middleware
app.use(errorHandler);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
