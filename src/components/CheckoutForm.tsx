import React, { useState, FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { ShopContext } from '../context/shop';
import { PaymentMethodResult } from '@stripe/stripe-js';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, emptyCart } = useContext(ShopContext);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const cardElement = elements?.getElement(CardElement);

    if (!cardElement) {
      setError('Card Element not found');
      setIsLoading(false);
      return;
    }

    const result = (await stripe?.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })) as PaymentMethodResult & { error?: { message: string } };

    const { error: stripeError, paymentMethod } = result;

    if (stripeError) {
      setError(stripeError.message);
      setIsLoading(false);
      return;
    }

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod?.id,
        items: cart,
      }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
      setIsLoading(false);
    } else {
      emptyCart();
      window.location.href = '/checkout/success';
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Payment Details
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="min-h-14">
            <CardElement options={cardElementOptions} className="p-4" />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Pay Now'
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
