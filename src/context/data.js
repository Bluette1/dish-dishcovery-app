import React, { createContext, useCallback, useMemo, useState } from 'react';
import useCategories from '../hooks/use-categories';
import useMeals from '../hooks/use-meals';
import useOrders from '../hooks/use-orders';
import { useSession } from 'next-auth/react';

export const DataContext = createContext();

function DataProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const [orders, setOrders] = useState([]);

  const { data: session, status } = useSession();

  const token = useMemo(() => {
    if (session && status === 'authenticated') {
      return session.idToken || session.user.token;
    }
    return null;
  }, [session, status]);

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useCategories();

  const {
    data: mealsData,
    isLoading: isLoadingMeals,
    error: mealsError,
  } = useMeals();

  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    error: ordersError,
  } = useOrders(token);

  const addCategories = useCallback((newCategories) => {
    setCategories(newCategories);
  }, []);

  const addMeals = useCallback((newMeals) => {
    setMeals(newMeals);
  }, []);

  const addOrders = useCallback((newOrders) => {
    setOrders(newOrders);
  }, []);

  const contextValue = {
    categories: categoriesData || categories,
    meals: mealsData || meals,
    orders: ordersData || orders,
    isLoading: isLoadingCategories || isLoadingMeals || isLoadingOrders,
    error: categoriesError || mealsError || ordersError,
    addCategories,
    addMeals,
    addOrders,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
