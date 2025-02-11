import React from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/shop';
import { PlusIcon, MinusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Image from 'next/image';

interface Meal {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
}
interface Item {
  meal: Meal;
  quantity: number;
}

export default function Cart() {
  const shop = useContext(ShopContext);
  const { cart, removeFromCart, updateQuantity } = shop;

  const cartTotal = cart.reduce(
    (sum: number, item: Item) => sum + item.meal.price * item.quantity,
    0,
  );

  return cart.length > 0 ? (
    <div className="mt-8 border-t pt-8 pb-6 px-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {cart.map((item: Item) => (
          <div
            key={item.meal._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <Image
                height={500}
                width={500}
                src={item.meal.imageUrl}
                alt={item.meal.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.meal.name}</h3>
                <p className="text-gray-600">
                  ${item.meal.price} x {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.meal._id, false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.meal._id, true)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.meal._id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4">
          <p className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</p>
          <Link href={'/checkout'}>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
