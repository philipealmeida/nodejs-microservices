import logger from '@utils/logger.js';
import { IProduct } from 'types/product.type';
import Product from '@models/product.model.js';

export const ProductService = {
  getProducts: async () => {
    return await Product.find({});
  },

  getProduct: async (id: string) => {
    return await Product.findById(id);
  },

  createProduct: async (productData: IProduct) => {
    const { name } = productData;
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      const errorMessage = `Product with name ${name} already exists`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    return await Product.create(productData);
  },

  updateProduct: async (id: string, productData: IProduct) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  },

  deleteProduct: async (id: string) => {
    return await Product.findByIdAndDelete(id);
  },
};
