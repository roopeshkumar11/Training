/**
 * ProductCard.test.tsx - Tested with React Native Testing Library
 * Verifies that the card displays title, price, and handles press events.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProductCard from '../src/components/ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Running Shoes',
    price: 1999,
    thumbnail: 'https://example.com/shoes.jpg',
  };

  it('renders product title and price correctly', async () => {
    await render(<ProductCard product={mockProduct} onPress={jest.fn()} />);

    expect(screen.getByText('Running Shoes')).toBeTruthy();
    expect(screen.getByText('₹1999')).toBeTruthy();
  });

  it('calls onPress callback when card is tapped', async () => {
    const onPressMock = jest.fn();
    await render(<ProductCard product={mockProduct} onPress={onPressMock} />);

    // Click using user-facing text
    fireEvent.press(screen.getByText('Running Shoes'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
