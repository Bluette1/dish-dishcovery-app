import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Success() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [orderNumber, setOrderNumber] = useState('');

  // Auto-redirect to home after 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // Generate order number on client side
  useEffect(() => {
    setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mx-auto h-24 w-24 flex items-center justify-center bg-green-100 rounded-full mb-8">
          <svg
            className="h-16 w-16 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We'll send you a confirmation email
          shortly.
        </p>

        <div className="text-sm text-gray-500 mb-8">
          Order number: #{orderNumber} {/* Use orderNumber from state */}
        </div>

        <div className="space-y-4">
          <Link
            href="/orders"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors"
          >
            View Order Details
          </Link>

          <Link
            href="/"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Redirecting to home in {countdown} seconds...
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Having trouble?{' '}
          <Link
            href="/contact"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
