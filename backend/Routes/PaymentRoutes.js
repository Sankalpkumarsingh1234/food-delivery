import express from 'express';
import { createCheckoutSession } from '../Controller/paymentController.js';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);

export default router;
