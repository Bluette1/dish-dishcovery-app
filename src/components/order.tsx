import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import useOrder from '../hooks/use-order';
import { useSession } from 'next-auth/react';
import LoadingSpinner from './loading-spinner';
import Image from 'next/image';
import { OrderItem } from '../../types/order';

const Order = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { id } = router.query;
  const token = useMemo(() => {
    if (session && status === 'authenticated') {
      return session.idToken || session.user.token;
    }
    return null;
  }, [session, status]);

  const { data: order, isLoading, error: isError } = useOrder(token, id);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) return <p>Error loading order details.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Order Number: {order.orderNumber}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-gray-600">
            Status: <span className="font-medium">{order.status}</span>
          </p>
          <p className="text-gray-600">
            Total Amount:{' '}
            <span className="font-medium">${order.amount.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {order.items.map((item: OrderItem, idx: number) => (
          <div
            key={`order-item-${idx}`}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]"
          >
            {item.meal && (
              <div className="flex flex-col h-full">
                <div className="relative pt-[60%]">
                  <Image
                    width={500}
                    height={500}
                    src={item.meal.imageUrl}
                    alt={item.meal.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="text-lg font-semibold mb-2">
                    {item.meal.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 flex-grow">
                    {item.meal.description}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="flex items-center">
                      <span className="text-gray-600">Qty:</span>
                      <span className="ml-2 font-medium">{item.quantity}</span>
                    </div>
                    <div className="text-primary-600 font-semibold">
                      ${item.meal.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {item.recipe && (
              <div className="flex flex-col h-full">
                <div className="relative pt-[60%]">
                  <Image
                    width={500}
                    height={500}
                    src={item.recipe.imageUrl}
                    alt={item.recipe.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="text-lg font-semibold mb-2">
                    {item.recipe.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 flex-grow">
                    {item.recipe.description}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="flex items-center">
                      <span className="text-gray-600">Qty:</span>
                      <span className="ml-2 font-medium">{item.quantity}</span>
                    </div>
                    <div className="text-primary-600 font-semibold">
                      ${item.recipe.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
