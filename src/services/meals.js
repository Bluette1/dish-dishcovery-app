import initialMeals from '@/data/meals';

const fetchMeals = async (queryString = '') => {
  let meals = initialMeals || [];
  try {
    const responseMeals = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/meals${queryString}`,
    );

    meals = await responseMeals.json();
  } catch (error) {}

  return meals;
};

export default fetchMeals;
