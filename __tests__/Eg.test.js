import { render, screen } from '@testing-library/react';
import React from 'react';

function App() {
  return <h1>Hello!</h1>;
}

test('renders hello message', () => {
  render(<App />);
  expect(screen.getByText('Hello!')).toBeInTheDocument();
});
