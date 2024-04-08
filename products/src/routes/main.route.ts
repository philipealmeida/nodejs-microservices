import express from 'express';
import routes from '@config/routes.js';
import productRoute from '@routes/product.route.js';

const router = express.Router();
// Define route for product-related operations
router.use(`${routes.api}${routes.products}`, productRoute);

// Define root route
router.get('/', (_, res) => {
  res.send('Hello from Node API Server Updated');
});

export default router;
