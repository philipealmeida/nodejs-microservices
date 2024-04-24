import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@controllers/product.controller.js';

const router = express.Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products from the database.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductErrorMessage'
 */
router.get('/', getProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a single product
 *     description: Retrieve a single product by its unique ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductErrorMessage'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductErrorMessage'
 */
router.get('/:id', getProduct);

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product data or internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductErrorMessage'
 */
router.post('/', createProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Update an existing product by its unique ID with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product ID or data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductErrorMessage'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductErrorMessage'
 */
router.put('/:id', updateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product by its unique ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductMessage'
 *       400:
 *         description: Invalid product ID or data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductErrorMessage'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductErrorMessage'
 */
router.delete('/:id', deleteProduct);

export default router;
