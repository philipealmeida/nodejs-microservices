// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import express from 'express';
// import connectDB from './config/db.js';
// import logger from './utils/logger.js';
// import mainRoute from './routes/main.route.js';
// import errorHandler from './middlewares/errorHandler.js';

// // Load environment variables from .env file
// dotenv.config();

// // Initialize Express application
// const app = express();

// // Apply Helmet middleware for security enhancements
// app.use(helmet());

// // Register middleware for parsing request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Initialize database connection
// connectDB();

// // Use the routes from mainRoute.js
// app.use(mainRoute);

// // Register global error handling middleware
// app.use(errorHandler);

// // Start the server
// const PORT = process.env.PORT ?? 3000;
// app.listen(PORT, () => {
//   logger.info(`Server is running on port ${PORT}`);
// });
console.log(3333);
