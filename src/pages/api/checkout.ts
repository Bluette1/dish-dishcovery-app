import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

interface Item {
  price: number;    
  quantity: number;
}

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia', // Use the latest API version
});

interface CustomError {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentMethodId, items } = req.body;

    // Calculate the total amount based on your items
    const amount = items.reduce(
      (acc: number, item: Item) => acc + item.price * item.quantity,
      0,
    );

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      return_url: `${req.headers.origin}/success`,
    });

    // Send the client secret to the client
    res.json({
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
    });
  } catch (err: unknown) {
    const errorMessage =
      (err as CustomError).message || 'An unknown error occurred.';
    res.status(500).json({
      error: errorMessage,
    });
  }
}
