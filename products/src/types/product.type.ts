import { z, ZodSchema } from 'zod';

export interface IProductErrorMessage {
  message: string;
}

export interface IProduct {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export const IdParamSchema: ZodSchema<{ id: string }> = z.object({
  id: z.string(),
});

export const ProductBodySchema: ZodSchema<IProduct> = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string().optional(),
});
