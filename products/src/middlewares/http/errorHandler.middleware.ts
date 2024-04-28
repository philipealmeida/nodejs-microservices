import { Request, Response } from 'express';

export default (error: any, _req: Request, res: Response) => {
  res.status(500).json({ message: error?.message });
};
