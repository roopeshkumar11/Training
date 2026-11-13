/**
 * ProductCard.test.tsx - ProductCard Component Testing
 * Verifies that the card displays title, price, and handles press events.
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text, TouchableOpacity } from 'react-native';
import ProductCard from '../src/components/ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Running Shoes',
    price: 1999,
    thumbnail: 'https://example.com/shoes.jpg',
  };

  // Test 1: Check title and price rendering
  it('renders product title and price correctly', () => {
    let renderer: any;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <ProductCard product={mockProduct} onPress={jest.fn()} />
      );
    });

    const root = renderer.root;
    const textNodes = root.findAllByType(Text);
    const textList = textNodes.map((node: any) =>
      Array.isArray(node.props.children)
        ? node.props.children.join('')
        : String(node.props.children)
    );

    expect(textList).toContain('Running Shoes');
    expect(textList.some((t: string) => t.includes('1999'))).toBe(true);
  });

  // Test 2: Check click event
  it('calls onPress callback when card is tapped', () => {
    const onPressMock = jest.fn();
    let renderer: any;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(
        <ProductCard product={mockProduct} onPress={onPressMock} />
      );
    });

    const touchable = renderer.root.findByType(TouchableOpacity);
    ReactTestRenderer.act(() => {
      touchable.props.onPress();
    });

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
