// src/__tests__/MealList.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import MealList from '../components/MealList'; // Adjust the import according to your structure
import { Meal } from '../types'; // Import your type definitions

const mockMeales: Meal[] = [
  { id: 1, name: 'Pizza', description: 'Cheesy goodness', image: 'pizza.jpg' },
  { id: 2, name: 'Burger', description: 'Juicy and delicious', image: 'burger.jpg' },
];

describe('MealList Component', () => {
  it('renders a list of meals', () => {
    render(<MealList meales={mockMeales} />);

    // Check that each meal is rendered
    mockMeales.forEach(meal => {
      expect(screen.getByText(meal.name)).toBeInTheDocument();
      expect(screen.getByText(meal.description)).toBeInTheDocument();
    });
  });

  it('displays a message when no meales are available', () => {
    render(<MealList meales={[]} />);
    
    expect(screen.getByText('No meales available')).toBeInTheDocument();
  });
});
