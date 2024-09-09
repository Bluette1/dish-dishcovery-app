// pages/api/track-order.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Define the shape of the order status data
interface OrderStatus {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  details: string;
}

// Sample data for demonstration
const orders: Record<string, OrderStatus> = {
  '12345': {
    orderNumber: '12345',
    status: 'Shipped',
    estimatedDelivery: '2024-09-10',
    details: 'Your order is on the way!'
  },
  '67890': {
    orderNumber: '67890',
    status: 'Delivered',
    estimatedDelivery: '2024-09-05',
    details: 'Your order has been delivered.'
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { orderNumber } = req.query;

  if (typeof orderNumber === 'string') {
    const order = orders[orderNumber];

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } else {
    res.status(400).json({ message: 'Invalid order number' });
  }
}
