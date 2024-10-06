// src/__tests__/MealItem.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import MealItem from '../components/MealItem'; // Adjust the import according to your structure
import { Meal } from '../types'; // Import your type definitions

const mockMeal: Meal = {
  id: 1,
  name: 'Pizza',
  description: 'Cheesy goodness',
  image: 'pizza.jpg',
};

describe('MealItem Component', () => {
  it('renders the meal information', () => {
    render(<MealItem meal={mockMeal} />);
    
    expect(screen.getByText(mockMeal.name)).toBeInTheDocument();
    expect(screen.getByText(mockMeal.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockMeal.name)).toHaveAttribute('src', mockMeal.image);
  });
});
