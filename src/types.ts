import { ViewState } from "react-map-gl";

export enum TemperatureUnitEnum {
  Celsius = 'celsius',
  Fahrenheit = 'fahrenheit'
};

export type Coordinates = number[];
export type ViewStateProps = ViewState & { width: number; height: number; };
export type WeatherData = {
  city: string,
  country: string,
  temperature: string,
  description: string,
  icon: string
}