import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const addMeals = (meals) => {
    setMeals(meals);
  };

  const addCategories = (categories) => {
    setCategories(categories);
  };

  useEffect(() => {
    const storedCategories = JSON.parse(
      window.localStorage.getItem('categories'),
    );
    storedCategories && setCategories(storedCategories);
    const storedMeals = JSON.parse(window.localStorage.getItem('meals'));
    storedMeals && setMeals(storedMeals);
  }, []);

  return (
    <DataContext.Provider
      value={{
        categories,
        meals,
        addCategories,
        addMeals,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
