import { render } from "@testing-library/react";
import Card from "../components/Card";

test('should render <Card>', () => {
  render(<Card isFetching={false} unit="celsius"/>);
});
