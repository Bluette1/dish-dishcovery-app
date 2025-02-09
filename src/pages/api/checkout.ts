import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getToken } from 'next-auth/jwt';
import { saveOrder, OrderStatus } from './orders';
import { saveUser } from './users';

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

const generateOrderNumber = () =>
  Math.random().toString(36).substr(2, 9).toUpperCase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentMethodId, items, receiptEmail } = req.body;

    // Calculate the total amount based on your items
    const amount = items.reduce(
      (acc: number, item: Item) => acc + item.price * item.quantity,
      0,
    );

    const orderNumber = generateOrderNumber();

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
      receipt_email: receiptEmail,
      return_url: `${req.headers.origin}/checkout/success?orderNumber=${orderNumber}`,
      metadata: {
        orderNumber: orderNumber, // Store order number in Stripe metadata
      },
    });

    //Retrieve userId
    let userId;
    const token = await getToken({ req });

    if (token) {
      const {
        user: { id },
      } = token.user;
      userId = id;
    } else {
      //Create a new user
      const user = { email: receiptEmail };
      const { id } = await saveUser(user);
      userId = id;
    }

    // Save the order using the external API
    const order = {
      orderNumber,
      stripePaymentIntentId: paymentIntent.id,
      amount,
      status: OrderStatus.PENDING, // Set initial status
      userId,
      items,
    };
    await saveOrder(order);

    // Send the client secret to the client
    res.json({
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
      orderNumber,
    });
  } catch (err: unknown) {
    const errorMessage =
      (err as CustomError).message || 'An unknown error occurred.';
    res.status(500).json({
      error: errorMessage,
    });
  }
}
