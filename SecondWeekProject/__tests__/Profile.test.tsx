/**
 * Profile.test.tsx - Tested with React Native Testing Library
 * Verifies that the screen displays user information and menu items.
 */

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ProfileScreen from '../src/screens/Profile';

describe('ProfileScreen', () => {
  it('renders user details and profile menu options', async () => {
    const navigationMock = { replace: jest.fn() };
    await render(<ProfileScreen navigation={navigationMock} />);

    expect(screen.getByText('My Profile')).toBeTruthy();
    expect(screen.getByText('Roopesh Kumar')).toBeTruthy();
    expect(screen.getByText('My Orders')).toBeTruthy();
    expect(screen.getByText('Log Out')).toBeTruthy();
  });
});
