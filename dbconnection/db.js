//const mongoose = ('mongoose');
import { connect } from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;