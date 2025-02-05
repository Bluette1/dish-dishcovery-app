import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import useUser from '../hooks/use-user';
import { useSWRConfig } from 'swr';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const { mutate } = useSWRConfig();

  const { data: session, status } = useSession();

  const token = useMemo(() => {
    if (session && status === 'authenticated') {
      const { user } = session;
      let usrToken = user.token;
      if (session.idToken) {
        usrToken = session.idToken;
      }
      return usrToken;
    }
  }, [session, status]);

  useEffect(() => {
    if (token) {
      const { id } = session.user.user;
      const { data: user } = useUser({ id, token });
      user && setUser(user);
    }
  }, [token]);

  const updateCart = async (cart) => {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${user.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(cart),
        },
      );
      if (response.ok) {
        // use swr mutate hook to update the user's cart data
        mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${user.id}`);
      } else {
        // Handle error
      }
    } else {
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    setCart(cart);
  };

  const addToCart = (meal) => {
    const existingItem = cart.find((item) => item._id === meal._id);

    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === meal._id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      updatedCart = [...cart, { ...meal, quantity: 1 }];
    }

    updateCart(updatedCart);
  };

  const removeFromCart = (mealId) => {
    const updatedCart = cart.filter((_cartItem) => _cartItem._id !== mealId);
    updateCart(updatedCart);
  };

  const emptyCart = () => {
    updateCart([]);
  };

  const updateQuantity = (mealId, increment) => {
    const updatedCart = cart.map((item) => {
      if (item._id === mealId) {
        const newQuantity = item.quantity + (increment ? 1 : -1);
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const clearContext = () => {
    window.localStorage.clear();
    setCart([]);
  };

  useEffect(() => {
    let storedCart;
    if (token && user) {
      storedCart = user.cart;
    } else {
      storedCart = JSON.parse(window.localStorage.getItem('cart'))
        ? JSON.parse(window.localStorage.getItem('cart'))
        : [];
    }
    setCart(storedCart);
  }, [token, user]);

  return (
    <ShopContext.Provider
      value={{
        cart: cart.sort((a, b) => a._id.localeCompare(b._id)),
        addToCart,
        emptyCart,
        removeFromCart,
        updateQuantity,
        clearContext,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
