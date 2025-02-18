// pages/api/track-order.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { orderNumber } = req.query;
  let { email } = req.query;

  const token = await getToken({ req });

  // If the user is not logged in, an email is required
  if (!token && typeof email !== 'string') {
    return res
      .status(400)
      .json({ message: 'Email is required for tracking orders.' });
  }

  if (token) {
    const {
      user: { email: userEmail },
    } = token.user;
    email = userEmail;
  }

  if (typeof orderNumber === 'string') {
    const response = await fetch(
      `${BASE_URL}/track/orders?orderNumber=${orderNumber}&email=${email}`,
    );
    const order = await response.json();
    if (response.ok) {
      res.status(200).json(order);
    } else {
      throw new Error(order.error || 'Failed to fetch order');
    }
  } else {
    res.status(400).json({ message: 'Invalid order number' });
  }
}
