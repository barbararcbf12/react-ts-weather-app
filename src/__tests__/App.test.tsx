import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../components/Map', () => {
  return () => <div>Mocked Map</div>;
});

beforeEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  (global.navigator as any).geolocation = {
    getCurrentPosition: jest.fn((success) =>
      success({
        coords: {
          latitude: 55.676098,
          longitude: 12.568337,
          accuracy: 100,
        },
      })
    ),
  };
});

test("renders <App> component without props", () => {
  render(<App />);
  const title = screen.getByText(/Weather app/i);
  expect(title).toBeInTheDocument();
});
