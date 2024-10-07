import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/categories`;

const saveCategory = async (name: string, token: string) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create category");
  }

  const newCategory = await response.json();
  return newCategory;
};

const getCategories = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch categories");
  }

  const categories = await response.json();
  return categories;
};

const updateCategory = async (id: string, name: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update category");
  }

  const updatedCategory = await response.json();
  return updatedCategory;
};

const deleteCategory = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete category");
  }

  return { message: "Category deleted successfully" };
};

// Define a type for HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const handlers: Record<
  HttpMethod,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {
  POST: async (req, res) => {
    const { name } = req.body;
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({ error: "Authorization token is required" });
    }

    const {
      token: bearerToken,
      user: { role },
    } = token.user;

    if (role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    if (!name)
      return res.status(400).json({ error: "Category name is required" });
    try {
      const newCategory = await saveCategory(name, bearerToken);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  GET: async (req, res) => {
    try {
      const categories = await getCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  DELETE: async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
    }
    try {
      await deleteCategory(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        error: (error as Error).message || "Failed to delete category",
      });
    }
  },
  PUT: async (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
      return res
        .status(400)
        .json({ error: "Category ID and name are required" });
    }

    try {
      const updatedCategory = await updateCategory(id, name);
      return res.status(200).json(updatedCategory);
    } catch (error) {
      return res.status(500).json({
        error: (error as Error).message || "Failed to update category",
      });
    }
  },
};

// Main API handler
const CategoriesAPIHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as HttpMethod;
  if (handlers[method]) {
    await handlers[method](req, res);
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};


export default CategoriesAPIHandler;