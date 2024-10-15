//Copenhagen's coordinates
import { Coordinates, ViewStateProps } from "../types";

export const initialCoordinates: Coordinates =  [55.676098, 12.568337];
export const initialViewState: ViewStateProps = {
  latitude: initialCoordinates[0],
  longitude: initialCoordinates[1],
  zoom: 10,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
  width: 100,
  height: 100
};