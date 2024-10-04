// pages/add-meal.tsx
import { useState } from 'react';
import AddMealForm from './addmealform';

const AddMealPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="my-3 flex items-center justify-center bg-gray-100 flex-col">
      <button
        onClick={toggleFormVisibility}
        className="mb-4 bg-blue-600 text-white rounded p-2"
      >
        {showForm ? 'Hide Form' : 'Add a Meal'}
      </button>
      {showForm && <AddMealForm />}
    </div>
  );
};

export default AddMealPage;
