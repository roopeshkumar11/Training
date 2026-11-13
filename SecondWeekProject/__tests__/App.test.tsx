/**
 * App.test.tsx - Root App Testing
 * Verifies that the root App component mounts without crashing.
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

describe('App Component', () => {
  it('renders root App successfully without crashing', async () => {
    let renderer: any;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<App />);
    });
    expect(renderer).toBeTruthy();
  });
});
