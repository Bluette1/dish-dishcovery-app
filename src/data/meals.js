const meals = [
  {
    name: 'Pancakes',
    description: 'Fluffy pancakes served with syrup.',
    recipe: 'Mix ingredients, cook on a griddle, and serve with syrup.',
    category: 'Breakfast',
    ingredients: ['Flour', 'Eggs', 'Milk', 'Sugar'],
    region: 'Global',
    price: 20,
    imageUrl:
      'https://dishdiscovery.s3.us-east-1.amazonaws.com/images/meals/pancakes.jpg',
  },
  {
    name: 'Avocado Toast',
    description: 'Toast topped with smashed avocado and seasonings.',
    recipe: 'Mash avocado on toast and season with salt and pepper.',
    category: 'Breakfast',
    ingredients: ['Bread', 'Avocado', 'Salt'],
    region: 'Global',
    price: 12,
    imageUrl:
      'https://dishdiscovery.s3.us-east-1.amazonaws.com/images/meals/avocado-toast.jpg',
  },
  {
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake topped with icing.',
    recipe: 'Bake the cake and frost with chocolate icing.',
    category: 'Dessert',
    ingredients: ['Flour', 'Cocoa Powder', 'Sugar', 'Eggs'],
    region: 'Global',
    price: 70,
    serves: 8,
    imageUrl:
      'https://dishdiscovery.s3.us-east-1.amazonaws.com/images/meals/chocolate-cake.jpg',
  },
  {
    name: 'Vegan Chili',
    description: 'Spicy chili made with beans and vegetables.',
    recipe: 'Simmer beans and vegetables with spices.',
    category: 'Vegan',
    ingredients: ['Beans', 'Tomatoes', 'Onions', 'Chili Powder'],
    region: 'Global',
    price: 25,
    imageUrl:
      'https://dishdiscovery.s3.us-east-1.amazonaws.com/images/meals/vegan-chili.jpg',
  },
  {
    name: 'Grilled Salmon',
    description: 'Delicious salmon fillet grilled to perfection.',
    recipe: 'Season salmon and grill until cooked through.',
    category: 'Seafood',
    ingredients: ['Salmon', 'Lemon', 'Herbs'],
    region: 'Global',
    price: 27,
    imageUrl:
      'https://dishdiscovery.s3.us-east-1.amazonaws.com/images/meals/grilled-salmon.jpg',
  },
  {
    name: 'Tandoori Chicken',
    description: 'Spicy chicken marinated in yogurt and spices.',
    recipe: 'Marinate chicken and cook in a tandoor.',
    category: 'Chicken',
    ingredients: ['Chicken', 'Yogurt', 'Spices'],
    region: 'Indian',
    price: 15,
    imageUrl:
      'https://dishdiscovery.s3.us-east-1.amazonaws.com/images/meals/tandoori-chicken.jpg',
  },
  {
    name: 'Beef Bourguignon',
    description: 'Beef stew braised in red wine.',
    recipe: 'Cook beef with wine, carrots, and onions.',
    category: 'Beef',
    ingredients: ['Beef', 'Red Wine', 'Carrots', 'Onions'],
    region: 'French',
    price: 26,
    imageUrl:
      'https://dishdiscovery.s3.us-east-1.amazonaws.com/images/meals/beef-bourguignon.jpg',
  },
  {
    name: 'Spaghetti Carbonara',
    description: 'Pasta with eggs, cheese, pancetta, and pepper.',
    recipe: 'Cook spaghetti and mix with egg and cheese mixture.',
    category: 'Pasta',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan'],
    region: 'Italian',
    price: 30,
    imageUrl:
      'https://dishdiscovery.s3.us-east-1.amazonaws.com/images/meals/carbonara.jpg',
  },
];

export default meals;
