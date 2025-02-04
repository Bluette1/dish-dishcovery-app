import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/auth.module.css';
import Meta from '@/components/meta';
import { Button } from '@headlessui/react';
import Link from 'next/link';

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, password }),
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
        <h1 className="text-2xl font-bold mb-4">Password Reset Successful</h1>
        <p className="text-gray-600 mb-6">
          Your password has been reset successfully. You can now log in with
          your new password.
        </p>
        <Link href="/login">
          <Button className={styles.button}>Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Meta
        title="Reset Password | Dish Discovery"
        description="Reset your password"
        keywords="reset password, dish discovery"
      />
      <main className={styles.container}>
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="password" className={styles.label}>
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            minLength={8}
          />

          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
            minLength={8}
          />

          <Button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </main>
    </>
  );
};

export default ResetPasswordPage;
