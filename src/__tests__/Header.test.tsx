import Header from "../components/Header";
import { render } from "@testing-library/react";

test('should render <Header>', () => {
  render(<Header onClick={() => null} toggleUnit={() => null} unit="celsius"/>);
});
