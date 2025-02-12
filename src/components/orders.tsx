import React, { useContext } from 'react';
import Link from 'next/link';
import { DataContext } from '../context/data';
import styles from '../styles/orders.module.css';
import LoadingSpinner from './loading-spinner';
import Image from 'next/image';
import { Order, OrderItem } from '../../types/order';

export default function Orders() {
  const { orders, isLoading } = useContext(DataContext);
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders</h1>
      {orders.length > 0 ? (
        <div className={styles.orderGrid}>
          {orders.map((order: Order) => (
            <div key={order._id} className={styles.orderItem}>
              <Link href={`/profile/orders/${order._id}`} passHref>
                <div className={styles.orderLink}>
                  <h2>Order Number: {order.orderNumber}</h2>
                  <p>Status: {order.status}</p>
                  <p>Total Amount: ${order.amount.toFixed(2)}</p>
                  {order.items.map((item: OrderItem, idx: number) => (
                    <div key={`order-item-${idx}`} className={styles.mealItem}>
                      {item.meal && (
                        <>
                          <Image
                            width={500}
                            height={500}
                            src={item.meal.imageUrl}
                            alt={item.meal.name}
                            className={styles.mealImage}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}
