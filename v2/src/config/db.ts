import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI ?? '', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority',
    });
    logger.info('Connected to database!');
  } catch (error) {
    logger.error('Connection failed!', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
