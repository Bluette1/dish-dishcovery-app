import { NextApiRequest, NextApiResponse } from 'next';
import stripe from 'stripe';
import { updateOrderByPaymentIntent, OrderStatus } from '../orders';

// Stripe IP ranges (you should keep this updated)
const STRIPE_IPS = [
  '54.187.174.169',
  '54.187.205.235',
  // ... add more Stripe IPs as needed
];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const clientIp = req.ip || '';

  if (!STRIPE_IPS.includes(clientIp)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied',
    });
  }

  const sig = req.headers['stripe-signature'] || '';
  let event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  function isError(err: unknown): err is Error {
    return (err as Error).message !== undefined;
  }

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    if (isError(err)) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    return res.status(400).send('Webhook Error: Unknown error');
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Update order status
    await updateOrderByPaymentIntent(paymentIntent.id, {
      status: OrderStatus.PAID,
    });

  }

  res.json({ received: true });
}
