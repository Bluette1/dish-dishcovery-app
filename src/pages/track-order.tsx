// pages/track-order.tsx
import { useState, FormEvent } from 'react';
import Head from 'next/head';
import styles from '../styles/trackorder.module.css'; // Import your CSS module
import Meta from '@/components/meta';

// Define the shape of the order status data
interface OrderStatus {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  details: string;
}

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Replace with your API endpoint
      const response = await fetch(`/api/track-order?orderNumber=${orderNumber}`);
      const data: OrderStatus | { message: string } = await response.json();

      if (response.ok) {
        setOrderStatus(data as OrderStatus);
      } else {
        setError((data as { message: string }).message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Meta
        title="Track Your Order | Dish Discovery"
        description="Track your order status and updates for Dish Discovery."
        keywords="track, order, delicious, healthy, affordable, dish, discovery"
      />
      <main className={styles.container}>
        <h1 className='py-6'>Track Your Order</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="orderNumber" className={styles.label}>Order Number</label>
          <input
            type="text"
            id="orderNumber"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {orderStatus && (
          <div className={styles.status}>
            <h2>Order Status</h2>
            <p><strong>Order Number:</strong> {orderStatus.orderNumber}</p>
            <p><strong>Status:</strong> {orderStatus.status}</p>
            <p><strong>Estimated Delivery:</strong> {orderStatus.estimatedDelivery}</p>
            <p><strong>Details:</strong> {orderStatus.details}</p>
          </div>
        )}
      </main>
    </>
  );
};

export default TrackOrderPage;
