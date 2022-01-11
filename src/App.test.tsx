import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('opens home', () => {
  render(<App />);
  const welcomeText = screen.getByText(/Welcome to my Triplog/i);
  expect(welcomeText).toBeInTheDocument();
});
