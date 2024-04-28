import dotenv from 'dotenv';
import express from 'express';
import 'module-alias/register';
import logger from '@utils/logger.js';
import { connectDB } from '@config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@config/swagger.js';
import mainRoute from '@routes/main.route.js';
import errorHandler from '@middlewares/http/errorHandler.middleware.js';
import { applySecurityMiddlewares } from '@middlewares/security/security.middleware';

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Apply security middlewares
applySecurityMiddlewares(app);

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
