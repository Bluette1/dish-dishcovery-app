// pages/track-order.tsx
import { useState, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../styles/trackorder.module.css';
import Meta from '@/components/meta';
import Link from 'next/link';

interface OrderStatus {
  _id: string;
  orderNumber: string;
  status: string;
}

const TrackOrderPage = () => {
  const { data: session } = useSession();
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/track-order?orderNumber=${orderNumber}&email=${encodeURIComponent(email)}`, // Include email
      );
      const data: OrderStatus | { message: string } = await response.json();

      if (response.ok) {
        setOrderStatus(data as OrderStatus);
      } else {
        setError(
          (data as { message: string }).message || 'Something went wrong',
        );
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-96">
      <Meta
        title="Track Your Order | Dish Discovery"
        description="Track your order status and updates for Dish Discovery."
        keywords="track, order, delicious, healthy, affordable, dish, discovery"
      />
      <main className={styles.container}>
        <h1 className="py-6">Track Your Order</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="orderNumber" className={styles.label}>
            Order Number
          </label>
          <input
            type="text"
            id="orderNumber"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            className={styles.input}
          />

          {/* Conditionally render email input if user is not logged in */}
          {!session && (
            <>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </>
          )}

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {orderStatus && (
          <div className={styles.status}>
            <h2>Order Status</h2>
            <p>
              <strong>Order Number:</strong> {orderStatus.orderNumber}
            </p>
            <p>
              <strong>Status:</strong> {orderStatus.status}
            </p>
            <p>
              <strong>Estimated Delivery:</strong> in approx. 1 hr
            </p>
            <p>
              <strong>Details:</strong>{' '}
              {!session && (
                <span>
                  <Link href="/login" className="underline">
                    Login
                  </Link>{' '}
                  to view details
                </span>
              )}
              {session && (
                <span>
                  <Link
                    href={`/profile/orders/${orderStatus._id}`}
                    className="underline"
                  >
                    View details
                  </Link>
                </span>
              )}
            </p>
          </div>
        )}
      </main>
    </section>
  );
};

export default TrackOrderPage;
