import { Request, Response } from 'express';
import Product from '@models/product.model.js';
import sendResponse from '@utils/responseHandler.js';
import asyncMiddleware from '@middlewares/asyncMiddleware.js';

export const getProducts = asyncMiddleware(async (req: Request, res: Response) => {
  const products = await Product.find({});
  sendResponse(res, 200, products);
});

export const getProduct = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return sendResponse(res, 404, { message: 'Product not found' });
  }
  sendResponse(res, 200, product);
});

export const createProduct = asyncMiddleware(async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  sendResponse(res, 200, product);
});

export const updateProduct = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true }).catch((error) => {
    return sendResponse(res, 404, { message: 'Product not found' });
  });

  if (product) {
    sendResponse(res, 200, product);
  }
});

export const deleteProduct = asyncMiddleware(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return sendResponse(res, 404, { message: 'Product not found' });
  }
  sendResponse(res, 200, { message: 'Product deleted successfully' });
});
