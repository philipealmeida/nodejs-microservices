import { Request, Response } from 'express';
import sendResponse from '@utils/responseHandler.js';
import { formatErrorDetails } from '@utils/validations';
import { ProductService } from '@services/product.service';
import asyncMiddleware from '@middlewares/asyncMiddleware.js';
import { IdParamSchema, ProductBodySchema } from '../types/product.type';

export const getProducts = asyncMiddleware(
  async (_req: Request, res: Response) => {
    const products = await ProductService.getProducts();

    sendResponse(res, 200, products);
  }
);

export const getProduct = asyncMiddleware(
  async (req: Request, res: Response) => {
    const parseResult = IdParamSchema.safeParse(req.params);

    if (!parseResult.success) {
      return sendResponse(res, 400, { message: 'Invalid product ID' });
    }

    const { id } = parseResult.data;
    const product = await ProductService.getProduct(id);

    if (!product) {
      return sendResponse(res, 404, { message: 'Product not found' });
    }

    sendResponse(res, 200, product);
  }
);

export const createProduct = asyncMiddleware(
  async (req: Request, res: Response) => {
    const parseResult = ProductBodySchema.safeParse(req.body);

    if (!parseResult.success) {
      const errorDetails = formatErrorDetails(parseResult);
      return sendResponse(res, 400, {
        message: `Invalid product data - ${errorDetails}`,
      });
    }

    const productData = parseResult.data;
    const product = await ProductService.createProduct(productData);

    sendResponse(res, 200, product);
  }
);

export const updateProduct = asyncMiddleware(
  async (req: Request, res: Response) => {
    const idParseResult = IdParamSchema.safeParse(req.params);
    const bodyParseResult = ProductBodySchema.safeParse(req.body);

    if (!idParseResult.success) {
      return sendResponse(res, 400, { message: 'Invalid product ID' });
    }

    if (!bodyParseResult.success) {
      const errorDetails = formatErrorDetails(bodyParseResult);
      return sendResponse(res, 400, {
        message: `Invalid product data - ${errorDetails}`,
      });
    }

    const { id } = idParseResult.data;
    const productData = bodyParseResult.data;
    const product = await ProductService.updateProduct(id, productData);

    if (!product) {
      return sendResponse(res, 404, { message: 'Product not found' });
    }

    return sendResponse(res, 200, product);
  }
);

export const deleteProduct = asyncMiddleware(async (req: Request, res: Response) => {
  const parseResult = IdParamSchema.safeParse(req.params);

  if (!parseResult.success) {
    return sendResponse(res, 400, { message: 'Invalid product ID' });
  }

  const { id } = parseResult.data;
  const product = await ProductService.deleteProduct(id);

  if (!product) {
    return sendResponse(res, 404, { message: 'Product not found' });
  }

  return sendResponse(res, 200, { message: 'Product deleted successfully' });
});
