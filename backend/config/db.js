import mongoose from 'mongoose';
import { MONGODB_URI } from './env.js';

// Use configured MONGODB_URI or a safe local default
const mangourl = MONGODB_URI;

mongoose.connect(mangourl)
  .then(() => console.log("connected to mongo db"))
  .catch((err) => console.error('MongoDB connection error:', err));

export default mongoose;

