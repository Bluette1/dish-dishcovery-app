import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside of a component to avoid recreating the instance on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#0570de',
    colorBackground: '#ffffff',
    colorText: '#30313d',
    colorDanger: '#df1b41',
    fontFamily: 'Ideal Sans, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '4px',
  },
};

export default function Checkout() {
  return (
    <div className="min-h-96 flex justify-center py-25 max-w-3xl mx-auto">
      <Elements options={{ appearance }} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}