import mongoose from 'mongoose';
import { MONGODB_URI } from './config/env.js';

const uri = MONGODB_URI;

async function test() {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connection successful');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('MongoDB connection error:');
    console.error(err);
    process.exit(1);
  }
}

test();
