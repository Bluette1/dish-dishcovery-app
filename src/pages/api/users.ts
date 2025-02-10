import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;
export interface User {
  email: string;
}

export const saveUser = async (user: User) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create user');
  }

  const newUser = await response.json();
  return newUser;
};

const getUsers = async (token: string) => {
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch users');
  }

  const users = await response.json();
  return users;
};

const updateUser = async (id: string, body: object, token: string) => {
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
    throw new Error(errorData.error || 'Failed to update user');
  }

  const updatedUser = await response.json();
  return updatedUser;
};

const deleteUser = async (id: string, token: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete user');
  }

  return { message: 'User deleted successfully' };
};

// Define a type for HTTP methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const handlers: Record<
  HttpMethod,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {
  POST: async (req, res) => {
    const user = req.body;

    if (!user) return res.status(400).json({ error: 'User body is required' });
    try {
      const newUser = await saveUser(user);
      res.status(201).json(newUser);
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
      const users = await getUsers(bearerToken);
      res.status(200).json(users);
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
      return res.status(400).json({ error: 'User ID is required' });
    }
    try {
      await deleteUser(id, bearerToken);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        error: (error as Error).message || 'Failed to delete user',
      });
    }
  },
  PUT: async (req, res) => {
    const { id, body } = req.body;
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required' });
    }

    const { token: bearerToken } = token.user;

    if (!id || !body) {
      return res.status(400).json({ error: 'User ID and body are required' });
    }

    try {
      const updatedUser = await updateUser(id, body, bearerToken);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({
        error: (error as Error).message || 'Failed to update user',
      });
    }
  },
};

// Main API handler
const usersAPIHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as HttpMethod;
  if (handlers[method]) {
    await handlers[method](req, res);
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersAPIHandler;
