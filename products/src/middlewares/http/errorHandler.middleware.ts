import { NextFunction, Request, Response } from 'express';
import logger from '@utils/logger.js';

export default (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorHandlerContext = 'ErrorHandlerMiddleware';
  logger.error(`${errorHandlerContext}: An error occurred`, {
    error: error?.message,
  });

  res.status(500).json({ message: error?.message });
};
