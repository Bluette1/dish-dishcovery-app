import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

interface Meal {
  name: string;
  description: string;
  recipe: string;
  category: string;
  ingredients: string[];
  region?: string;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/meals`;

const saveMeal = async (meal: Meal, token: string) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create category");
  }

  const newMeal = await response.json();
  return newMeal;
};

const getMeals = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch meals");
  }

  const meals = await response.json();
  return meals;
};

const updateMeal = async (id: string, name: string) => {
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

  const updatedMeal = await response.json();
  return updatedMeal;
};

const deleteMeal = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete category");
  }

  return { message: "Meal deleted successfully" };
};

// Define a type for HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const handlers: Record<
  HttpMethod,
  (req: NextApiRequest, res: NextApiResponse) => Promise<void>
> = {
  POST: async (req, res) => {
    const meal = req.body;
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

    if (!meal)
      return res.status(400).json({ error: "Meal body is required" });
    try {
      const newMeal = await saveMeal(meal, bearerToken);
      res.status(201).json(newMeal);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  GET: async (req, res) => {
    try {
      const meals = await getMeals();
      res.status(200).json(meals);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  DELETE: async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Meal ID is required" });
    }
    try {
      await deleteMeal(id);
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
        .json({ error: "Meal ID and name are required" });
    }

    try {
      const updatedMeal = await updateMeal(id, name);
      return res.status(200).json(updatedMeal);
    } catch (error) {
      return res.status(500).json({
        error: (error as Error).message || "Failed to update category",
      });
    }
  },
};

// Main API handler
const mealsAPIHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as HttpMethod;
  if (handlers[method]) {
    await handlers[method](req, res);
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default mealsAPIHandler;