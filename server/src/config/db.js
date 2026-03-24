import mongoose from 'mongoose';
import { env } from './env.js';


const connectDB = async () => {
  try {
    // Mongoose 6+ and MongoDB Node driver 4+ don't need/use the old options.
    const conn = await mongoose.connect(env.mongoUri);

    // Connection success message
    console.log(`✅ MongoDB connected to ${conn.connection.host}/${conn.connection.name}`);

    // Attach helpful mongoose connection event logs
    mongoose.connection.on('connected', () => {
      console.log('📡 Mongoose default connection is open');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose default connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  Mongoose default connection is disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🛑 Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;



