import { Request, Response, NextFunction } from 'express';

const asyncMiddleware =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      return !res.headersSent
        ? res.status(500).json({
            message:
              error instanceof Error
                ? error.message
                : 'An unexpected error occurred',
          })
        : next(error);
    }
  };

export default asyncMiddleware;
