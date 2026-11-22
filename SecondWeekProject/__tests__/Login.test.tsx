/**
 * Login.test.tsx - Tested with React Native Testing Library
 * Verifies email/password inputs and form validation on empty submission.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/screens/Login';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('LoginScreen', () => {
  it('renders email and password input fields', async () => {
    await render(<LoginScreen />);

    expect(screen.getByPlaceholderText('yourname@email.com')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your password')).toBeTruthy();
  });

  it('displays validation errors when submitting an empty form', async () => {
    await render(<LoginScreen />);

    // Click Login button using user-facing text
    const loginButton = screen.getByText('Login');
    fireEvent.press(loginButton);

    // findByText waits for state update to complete
    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(screen.getByText('Password is required')).toBeTruthy();
  });
});
