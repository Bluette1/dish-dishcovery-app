// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {

    // Add your signup logic here, e.g., create a new user in the database
    // Example response
    res.status(200).json({ message: 'Signup successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
