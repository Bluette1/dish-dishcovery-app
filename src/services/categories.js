const fetchCategories = async (queryString = "") => {
  let categories = [];

  try {
    const responseCategories = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories${queryString}`);
    categories = await responseCategories.json();
  } catch (error) {}

  return categories;
};

export default fetchCategories;
