// components/AddMealForm.tsx
import { useState } from 'react';

interface Meal {
  name: string;
  description: string;
  recipe: string;
  category: string;
  ingredients: string[];
  region?: string;
}

const AddMealForm: React.FC = () => {
  const [meal, setMeal] = useState<Meal>({
    name: '',
    description: '',
    recipe: '',
    category: '',
    ingredients: [''],
    region: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...meal.ingredients];
    updatedIngredients[index] = value;
    setMeal((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  const addIngredient = () => {
    setMeal((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ''],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meal),
    });

    if (response.ok) {
      // Handle success (e.g., reset form or notify user)
      console.log('Meal added successfully!');
      setMeal({
        name: '',
        description: '',
        recipe: '',
        category: '',
        ingredients: [''],
        region: '',
      });
    } else {
      // Handle error
      console.error('Failed to add meal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add a New Meal</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={meal.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={meal.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Recipe</label>
        <textarea
          name="recipe"
          value={meal.recipe}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={meal.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Ingredients</label>
        {meal.ingredients.map((ingredient, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="text-blue-600 hover:underline">
          Add Another Ingredient
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Region</label>
        <input
          type="text"
          name="region"
          value={meal.region}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white rounded p-2">
        Add Meal
      </button>
    </form>
  );
};

export default AddMealForm;
