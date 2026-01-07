import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_SUCCESS_URL, STRIPE_CANCEL_URL } from '../config/env.js';

let stripe = null;

const initStripe = () => {
  if (!stripe) {
    if (!STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripe = new Stripe(STRIPE_SECRET_KEY);
  }
  return stripe;
};

export const createCheckoutSession = async (req, res) => {
  try {
    const stripe = initStripe();

    const { amount } = req.body; // amount in cents
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    console.log(`Creating Stripe session for amount: ${amount}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Food order' },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: STRIPE_SUCCESS_URL,
      cancel_url: STRIPE_CANCEL_URL,
    });

    console.log('Stripe session created:', session.id);
    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ message: err.message || 'Stripe error' });
  }
};
