import { NextApiRequest, NextApiResponse } from 'next';
import stripe from 'stripe';
import { updateOrderByPaymentIntent, OrderStatus } from '../orders';

const STRIPE_IPS = [
  '3.18.12.63',
  '3.130.192.231',
  '13.235.14.237',
  '13.235.122.149',
  '18.211.135.69',
  '35.154.171.200',
  '52.15.183.38',
  '54.88.130.119',
  '54.88.130.237',
  '54.187.174.169',
  '54.187.205.235',
  '54.187.216.72',
];

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we will parse it manually
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const signature = req.headers['stripe-signature'] || '';
  const rawBody = await getRawBody(req);

  // Check IP address
  const forwardedFor = req.headers['x-forwarded-for'];
  const forwardedIps: string[] = Array.isArray(forwardedFor)
    ? forwardedFor
    : typeof forwardedFor === 'string'
      ? forwardedFor.split(',').map((ip) => ip.trim())
      : [];
  const remoteIp = req.socket.remoteAddress;

  const ips = [...forwardedIps, remoteIp];
  const isAllowed = ips.some((ip) => ip && STRIPE_IPS.includes(ip));

  if (!isAllowed) {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }

  function isError(err: unknown): err is Error {
    return (err as Error).message !== undefined;
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
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

// Function to read the raw body from the request
async function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let rawBody = '';
    req.on('data', (chunk) => {
      rawBody += chunk;
    });
    req.on('end', () => {
      resolve(rawBody);
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}
