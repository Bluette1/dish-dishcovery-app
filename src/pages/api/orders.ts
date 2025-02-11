import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
export interface OrderItem {
  _id: string;
  quantity: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

interface Order {
  orderNumber: string;
  stripePaymentIntentId: string;
  amount: number;
  status: OrderStatus;
  user: string;
  items: OrderItem[];
}

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/orders`;

export const saveOrder = async (order: Order) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create order');
  }

  const newOrder = await response.json();
  return newOrder;
};

const getOrders = async (token: string) => {
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch orders');
  }

  const orders = await response.json();
  return orders;
};

export const updateOrder = async (id: string, body: object, token: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update order');
  }

  const updatedOrder = await response.json();
  return updatedOrder;
};

export const updateOrderByPaymentIntent = async (id: string, body: object) => {
  const response = await fetch(`${BASE_URL}/payment-intent/${id}`, {
    method: 'PUT',
    headers: {
      'x-api-key': `${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update order');
  }

  const updatedOrder = await response.json();

  return updatedOrder;
};

const deleteOrder = async (id: string, token: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete order');
  }

  return { message: 'Order deleted successfully' };
};

// Define a type for HTTP methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const handlers: Record<
  HttpMethod,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {
  POST: async (req, res) => {
    const order = req.body;

    if (!order)
      return res.status(400).json({ error: 'Order body is required' });
    try {
      const newOrder = await saveOrder(order);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  GET: async (req, res) => {
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required' });
    }

    const {
      token: bearerToken,
      user: { role },
    } = token.user;

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    try {
      const orders = await getOrders(bearerToken);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  DELETE: async (req, res) => {
    const { id } = req.body;
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required' });
    }

    const {
      token: bearerToken,
      user: { role },
    } = token.user;

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    if (!id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }
    try {
      await deleteOrder(id, bearerToken);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        error: (error as Error).message || 'Failed to delete order',
      });
    }
  },
  PUT: async (req, res) => {
    const { id, body } = req.body;
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required' });
    }

    const {
      token: bearerToken,
      user: { role },
    } = token.user;

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!id || !body) {
      return res.status(400).json({ error: 'Order ID and body are required' });
    }

    try {
      const updatedOrder = await updateOrder(id, body, bearerToken);
      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(500).json({
        error: (error as Error).message || 'Failed to update order',
      });
    }
  },
};

// Main API handler
const ordersAPIHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as HttpMethod;
  if (handlers[method]) {
    await handlers[method](req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default ordersAPIHandler;
