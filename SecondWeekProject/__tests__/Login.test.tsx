/**
 * Login.test.tsx - Login Screen Testing
 * Verifies email/password inputs and form validation on empty submission.
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text, TouchableOpacity, TextInput } from 'react-native';
import LoginScreen from '../src/screens/Login';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('LoginScreen', () => {
  // Test 1: Check inputs
  it('renders email and password input fields', () => {
    let renderer: any;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<LoginScreen />);
    });

    const inputs = renderer.root.findAllByType(TextInput);
    expect(inputs.length).toBe(2);
  });

  // Test 2: Check validation
  it('displays validation errors when submitting an empty form', () => {
    let renderer: any;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<LoginScreen />);
    });

    // Find and press Login button
    const loginButton = renderer.root.findAllByType(TouchableOpacity).find((btn: any) => {
      const texts = btn.findAllByType(Text);
      return texts.some((t: any) => t.props.children === 'Login');
    });

    ReactTestRenderer.act(() => {
      loginButton.props.onPress();
    });

    // Verify error messages
    const textNodes = renderer.root.findAllByType(Text).map((t: any) => String(t.props.children));
    expect(textNodes).toContain('Email is required');
    expect(textNodes).toContain('Password is required');
  });
});
