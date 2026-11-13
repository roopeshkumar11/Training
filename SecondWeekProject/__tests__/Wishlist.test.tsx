/**
 * Wishlist.test.tsx - Wishlist Screen Testing
 * Verifies that the screen displays the header title and empty state message.
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import WishlistScreen from '../src/screens/Wishlist';

describe('WishlistScreen', () => {
  it('renders wishlist title and empty state message', () => {
    let renderer: any;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<WishlistScreen />);
    });

    const textNodes = renderer.root.findAllByType(Text).map((t: any) => String(t.props.children));

    expect(textNodes).toContain('Your Wishlist');
    expect(textNodes).toContain('No saved items yet.');
  });
});
