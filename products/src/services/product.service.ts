import Product from '@models/product.model.js';
import { IProduct } from 'types/product.type';

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
      throw new Error(`Product with name ${name} already exists`);
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
