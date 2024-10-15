import React from "react";
import { render } from "@testing-library/react";
import Pin from "../components/Pin";
import { initialCoordinates } from "../App";

jest.mock('react-map-gl', () => ({
  Marker: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

test('should render <Pin>', () => {
  render(<Pin marker={ initialCoordinates }>Test</Pin>);
});
