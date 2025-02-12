export interface Meal {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface OrderItem {
  quantity: number;
  meal?: Meal;
  recipe?: Recipe;
}

export interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  amount: number;
  items: OrderItem[];
}
