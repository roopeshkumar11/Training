/**
 * Profile.test.tsx - Profile Screen Testing
 * Verifies that the screen displays user information and menu items.
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import ProfileScreen from '../src/screens/Profile';

describe('ProfileScreen', () => {
  it('renders user details and profile menu options', () => {
    const navigationMock = { replace: jest.fn() };
    let renderer: any;
    ReactTestRenderer.act(() => {
      renderer = ReactTestRenderer.create(<ProfileScreen navigation={navigationMock} />);
    });

    const textNodes = renderer.root.findAllByType(Text).map((t: any) => String(t.props.children));

    expect(textNodes).toContain('My Profile');
    expect(textNodes).toContain('Roopesh Kumar');
    expect(textNodes).toContain('My Orders');
    expect(textNodes).toContain('Log Out');
  });
});
