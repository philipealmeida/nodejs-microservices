import mongoose from 'mongoose';
import logger from '@utils/logger.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? '', {
      retryWrites: true,
      w: 'majority',
    });
    logger.info('Connected to database!');
  } catch (error) {
    logger.error('Connection failed!', error);
    process.exit(1);
  }
};
