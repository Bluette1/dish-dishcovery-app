import React from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/shop';
import Link from 'next/link';
import Image from 'next/image';

interface Item {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
}
export default function Cart() {
  const shop = useContext(ShopContext);
  const { wishList, removeFromWishList, addToCart } = shop;

  return wishList.length > 0 ? (
    <div className="mt-8 border-t pt-8 pb-6 px-4">
      <h2 className="text-2xl font-bold mb-4">Wish List</h2>
      <div className="space-y-4">
        {wishList.map((item: Item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <Image
                height={500}
                width={500}
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={async () => {
                  await addToCart(item);
                }}
                className="w-32 mt-12 md:my-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2  px-1.5 md:px-4 rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishList(item._id)}
                className="mt-12 md:my-8 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center pt-4">
          <Link href={'/'}>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
