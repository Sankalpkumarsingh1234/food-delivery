// Centralized environment configuration and validation
// Loads environment variables (dotenv is already imported in index.js)

const required = ['JWT_SECRET', 'MONGODB_URI'];

const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  if (process.env.NODE_ENV === 'production') {
    console.error(`Missing required env vars: ${missing.join(', ')}. Exiting.`);
    process.exit(1);
  } else {
    console.warn(`Warning: Missing env vars: ${missing.join(', ')}. Using safer defaults where possible.`);
  }
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food';
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_SUCCESS_URL = process.env.STRIPE_SUCCESS_URL || 'http://localhost:5175/';
export const STRIPE_CANCEL_URL = process.env.STRIPE_CANCEL_URL || 'http://localhost:5175/';

export default {
  JWT_SECRET,
  MONGODB_URI,
  STRIPE_SECRET_KEY,
  STRIPE_SUCCESS_URL,
  STRIPE_CANCEL_URL,
};