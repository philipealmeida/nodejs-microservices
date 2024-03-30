import { NextFunction, Request, Response } from 'express';

export default (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({ message: error.message });
};
