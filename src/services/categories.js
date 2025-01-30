import initialCategories from "@/data/categories";

const fetchCategories = async () => {
  let categories = initialCategories || [];

  try {
    const responseCategories = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories`
    );
    categories = await responseCategories.json();
  } catch (error) {}

  return categories;
};

export default fetchCategories;
