import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import useUser from '../hooks/use-user';
import { useSWRConfig } from 'swr';
import useSWR from 'swr';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const { mutate } = useSWRConfig();

  const { data: session, status } = useSession();
  const userId = useMemo(() => {
    return session?.user?.user?.id;
  }, [session]);

  const token = useMemo(() => {
    if (session && status === 'authenticated') {
      return session.idToken || session.user.token;
    }
    return null;
  }, [session, status]);

  const { data: fetchedUser, isLoading: isUserLoading } = useUser({
    id: userId,
    token,
  });

  // Fetch meals data
  const { data: meals, isLoading: isMealsLoading } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_BASE_URL}/meals`, token] : null,
    async ([url, token]) => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch meals');
      return response.json();
    },
  );

  // Map cart items with meal details
  const mapCartWithMeals = (cartItems, mealsData) => {
    if (!cartItems || !mealsData) return [];

    return cartItems
      .map((cartItem) => {
        const mealDetails = mealsData.find((meal) => meal._id === cartItem._id);
        if (!mealDetails) return null;

        return {
          ...mealDetails,
          quantity: cartItem.quantity,
        };
      })
      .filter(Boolean); // Remove null items
  };

  useEffect(() => {
    if (token && fetchedUser && !isUserLoading) {
      setUser(fetchedUser);
    }
  }, [token, fetchedUser, isUserLoading]);

  const updateCart = async (newCart) => {
    try {
      if (session && userId) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cart: newCart }),
          },
        );

        if (!response.ok) {
          console.log('Failed to update cart');
          throw new Error('Failed to update cart');
        }

        // Update SWR cache
        await mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`);
      } else {
        // For non-authenticated users, store full meal details
        localStorage.setItem('cart', JSON.stringify(newCart));
      }

      setCart(newCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const addToCart = (meal) => {
    const existingItem = cart.find((item) => item._id === meal._id);

    const updatedCart = existingItem
      ? cart.map((item) =>
          item._id === meal._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...cart, { ...meal, quantity: 1 }];

    updateCart(updatedCart);
  };

  const removeFromCart = (mealId) => {
    const updatedCart = cart.filter((item) => item._id !== mealId);
    updateCart(updatedCart);
  };

  const updateQuantity = (mealId, increment) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === mealId) {
          const newQuantity = item.quantity + (increment ? 1 : -1);
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const emptyCart = () => {
    updateCart([]);
  };

  const clearContext = () => {
    localStorage.clear();
    setCart([]);
    setUser(null);
  };

  // Load initial cart data
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (token && user && meals) {
          // For authenticated users, map cart items with meal details
          const mappedCart = mapCartWithMeals(user.cart, meals);
          setCart(mappedCart);
        } else {
          // For non-authenticated users, use localStorage
          const storedCart = localStorage.getItem('cart');
          setCart(storedCart ? JSON.parse(storedCart) : []);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCart([]);
      }
    };

    loadCart();
  }, [token, user, meals]);

  const contextValue = {
    cart: cart.sort((a, b) => a._id.localeCompare(b._id)),
    addToCart,
    emptyCart,
    removeFromCart,
    updateQuantity,
    clearContext,
    user,
    isLoading: isUserLoading || isMealsLoading,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
