import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Implement your subscription logic here
    // For example, save the email to a database or send it to an external service

    res.status(200).json({ message: 'Subscription successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
