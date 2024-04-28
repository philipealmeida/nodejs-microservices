import { Request, Response, NextFunction } from 'express';
import logger from '@utils/logger.js';

const asyncMiddleware =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      const errorMessage = `AsyncMiddleware: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`;
      logger.error(errorMessage);
      return !res.headersSent
        ? res.status(500).json({ message: errorMessage })
        : next(error);
    }
  };

export default asyncMiddleware;
