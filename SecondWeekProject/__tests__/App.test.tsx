/**
 * App.test.tsx - Tested with React Native Testing Library
 * Verifies that the root App component mounts without crashing.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App Component', () => {
  it('renders root App successfully without crashing', async () => {
    const rendered = await render(<App />);
    expect(rendered.toJSON()).toBeTruthy();
  });
});
