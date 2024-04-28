import { Request, Response } from 'express';
import sendResponse from '@utils/responseHandler.js';
import { formatErrorDetails } from '@utils/validations';
import { ProductService } from '@services/product.service';
import asyncMiddleware from '@middlewares/http/async.middleware.js';
import { IdParamSchema, ProductBodySchema } from '../types/product.type';
import logger from '@utils/logger.js';

export const getProducts = asyncMiddleware(
  async (_req: Request, res: Response) => {
    const products = await ProductService.getProducts();

    sendResponse(res, 200, products);
  }
);

export const getProduct = asyncMiddleware(
  async (req: Request, res: Response) => {
    const parseResult = IdParamSchema.safeParse(req.params);
    const invalidIdMessage = 'Invalid product ID';

    if (!parseResult.success) {
      logger.error(invalidIdMessage);
      return sendResponse(res, 400, { message: invalidIdMessage });
    }

    const { id } = parseResult.data;
    const product = await ProductService.getProduct(id);
    const notFoundMessage = 'Product not found';

    if (!product) {
      logger.error(notFoundMessage);
      return sendResponse(res, 404, { message: notFoundMessage });
    }

    sendResponse(res, 200, product);
  }
);

export const createProduct = asyncMiddleware(
  async (req: Request, res: Response) => {
    const parseResult = ProductBodySchema.safeParse(req.body);
    const errorDetails = formatErrorDetails(parseResult);
    const invalidDataMessage = `Invalid product data - ${errorDetails}`;

    if (!parseResult.success) {
      logger.error(invalidDataMessage);
      return sendResponse(res, 400, {
        message: invalidDataMessage,
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
    const invalidIdMessage = 'Invalid product ID';
    const errorDetails = formatErrorDetails(bodyParseResult);
    const invalidDataMessage = `Invalid product data - ${errorDetails}`;

    if (!idParseResult.success) {
      logger.error(invalidIdMessage);
      return sendResponse(res, 400, { message: invalidIdMessage });
    }

    if (!bodyParseResult.success) {
      logger.error(invalidDataMessage);
      return sendResponse(res, 400, {
        message: invalidDataMessage,
      });
    }

    const { id } = idParseResult.data;
    const productData = bodyParseResult.data;
    const product = await ProductService.updateProduct(id, productData);
    const notFoundMessage = 'Product not found';

    if (!product) {
      logger.error(notFoundMessage);
      return sendResponse(res, 404, { message: notFoundMessage });
    }

    return sendResponse(res, 200, product);
  }
);

export const deleteProduct = asyncMiddleware(
  async (req: Request, res: Response) => {
    const parseResult = IdParamSchema.safeParse(req.params);
    const invalidIdMessage = 'Invalid product ID';
    const notFoundMessage = 'Product not found';

    if (!parseResult.success) {
      logger.error(invalidIdMessage);
      return sendResponse(res, 400, { message: invalidIdMessage });
    }

    const { id } = parseResult.data;
    const product = await ProductService.deleteProduct(id);

    if (!product) {
      logger.error(notFoundMessage);
      return sendResponse(res, 404, { message: notFoundMessage });
    }

    return sendResponse(res, 200, { message: 'Product deleted successfully' });
  }
);
