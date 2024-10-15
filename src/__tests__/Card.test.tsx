import { render } from "@testing-library/react";
import Card from "../components/Card";
import { TemperatureUnitEnum } from "../types";

test('should render <Card>', () => {
  render(<Card isFetching={false} unit={TemperatureUnitEnum.Celsius}/>);
});
