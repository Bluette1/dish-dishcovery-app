import React, { useState, FormEvent } from 'react';
import styles from '../styles/auth.module.css';
import Meta from '@/components/meta';
import { Button } from '@headlessui/react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        <p className="text-gray-600">
          If an account exists for {email}, you will receive a password reset
          link shortly.
        </p>
      </div>
    );
  }

  return (
    <>
      <Meta
        title="Forgot Password | Dish Discovery"
        description="Reset your password"
        keywords="forgot password, reset password, dish discovery"
      />
      <main className={styles.container}>
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p className="text-gray-600 mb-4">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
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
          <Button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </main>
    </>
  );
};

export default ForgotPasswordPage;
