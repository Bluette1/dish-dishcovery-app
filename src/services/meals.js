const fetchMeals= async (queryString = '') => {
  let meals = [];
  try {
    const responseMeals= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/meals${queryString}`);
    
    meals = await responseMeals.json();

  } catch (error) {}

  return meals;
};

export default fetchMeals;
