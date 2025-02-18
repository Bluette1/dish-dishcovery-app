import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import useUser from '../hooks/use-user';
import { useSWRConfig } from 'swr';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);
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

  const updateWishList = async (newWishList) => {
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
            body: JSON.stringify({
              wishList: newWishList.map((item) => item._id),
            }),
          },
        );

        if (!response.ok) {
          console.log('Failed to update wishList');
          throw new Error('Failed to update wishList');
        }

        // Update SWR cache
        await mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`);
      } else {
        // For non-authenticated users, store full meal details
        localStorage.setItem('wishList', JSON.stringify(newWishList));
      }

      setWishList(newWishList);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const addToCart = (meal) => {
    const existingItem = cart.find((item) => item.meal._id === meal._id);

    const updatedCart = existingItem
      ? cart.map((item) =>
          item.meal._id === meal._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...cart, { meal, quantity: 1 }];

    updateCart(updatedCart);
    removeFromWishList(meal._id);
  };

  const addToWishList = (meal) => {
    const existingItem = wishList.find((item) => item._id === meal._id);

    const updatedWishList = existingItem ? wishList : [...wishList, meal];

    updateWishList(updatedWishList);
  };

  const removeFromCart = (mealId) => {
    const updatedCart = cart.filter((item) => item.meal._id !== mealId);
    updateCart(updatedCart);
  };

  const removeFromWishList = (mealId) => {
    const updatedWishList = wishList.filter((item) => item._id !== mealId);
    updateWishList(updatedWishList);
  };

  const updateQuantity = (mealId, increment) => {
    const updatedCart = cart
      .map((item) => {
        if (item.meal._id === mealId) {
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
    setWishList([]);
    setUser(null);
  };

  const isInCart = (mealId) => cart.find((item) => item.meal._id === mealId);

  const isInWishList = (mealId) => wishList.find((item) => item._id === mealId);

  // Load initial cart and wishList data
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (token && user) {
          setCart(user.cart);
          setWishList(user.wishList);
        } else {
          // For non-authenticated users, use localStorage
          const storedCart = localStorage.getItem('cart');
          setCart(storedCart ? JSON.parse(storedCart) : []);

          const storedWishList = localStorage.getItem('wishList');
          setWishList(storedWishList ? JSON.parse(storedWishList) : []);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCart([]);
        setWishList([]);
      }
    };

    loadCart();
  }, [token, user]);

  const contextValue = {
    cart: cart.sort((a, b) => a.meal.name.localeCompare(b.meal.name)),
    addToCart,
    addToWishList,
    emptyCart,
    removeFromCart,
    removeFromWishList,
    updateQuantity,
    clearContext,
    isInCart,
    isInWishList,
    user,
    wishList,
    isLoading: isUserLoading,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
