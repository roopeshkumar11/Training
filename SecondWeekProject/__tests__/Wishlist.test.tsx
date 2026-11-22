/**
 * Wishlist.test.tsx - Tested with React Native Testing Library
 * Verifies that the screen displays the header title and empty state message.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import WishlistScreen from '../src/screens/Wishlist';

describe('WishlistScreen', () => {
  it('renders wishlist title and empty state message', async () => {
    await render(<WishlistScreen />);

    expect(screen.getByText('Your Wishlist')).toBeTruthy();
    expect(screen.getByText('No saved items yet.')).toBeTruthy();
  });
});
