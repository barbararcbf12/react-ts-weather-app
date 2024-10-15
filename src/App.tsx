import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import { fetchWeatherData } from "./api/fetchWeatherData";
import Pin from "./components/Pin";
import Card from "./components/Card";
import { NavigationControl, ViewState } from "react-map-gl";

export type TemperatureUnitEnum = 'celsius' | 'fahrenheit';
export type Coordinates = number[];
export type ViewStateProps = ViewState & { width: number; height: number; };
export type WeatherData = {
  city: string,
  country: string,
  temperature: string,
  description: string,
  icon: string
}

//Copenhagen's coordinates
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

const setMapCenter = (position: Omit<GeolocationPosition, 'timestamp'>): Coordinates => {
  return position ? [position.coords.latitude, position.coords.longitude] : initialCoordinates;
};

function App() {
  const initialTempUnit: string | null = window.localStorage.getItem('temperatureUnit');
  const [unit, setUnit] = useState<TemperatureUnitEnum>( initialTempUnit && JSON.parse(initialTempUnit) ? JSON.parse(initialTempUnit) : 'celsius');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [viewState, setViewState] = useState<ViewStateProps>(initialViewState);
  const [position, setPosition] = useState<Coordinates>(initialCoordinates);
  const [marker, setMarker] = useState<Coordinates>(setMapCenter({ coords: { latitude: position[0], longitude: position[1], accuracy: 0, altitude: null, altitudeAccuracy: null, heading: null, speed: null }}));
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);

  const getApiData = async (lat: number, long: number) => await fetchWeatherData(lat, long, setWeatherData, setIsFetching);

  const handleOnClick = (lat: number, long: number) => {
    setMarker([lat, long]);
    setViewState( (prevState) => ({
        ...prevState,
        longitude: long,
        latitude: lat,
        zoom: 8
      }
    ));
    getApiData(lat, long);
  };

  const toggleUnit = () => {
    const toggledTemp = unit === 'fahrenheit' ? 'celsius' : 'fahrenheit'
    setUnit(toggledTemp);
    window.localStorage.setItem('temperatureUnit', JSON.stringify(toggledTemp));
  };

  const handleOnMove = (newViewState: ViewStateProps) => {
    if (newViewState.longitude !== viewState.longitude || newViewState.latitude !== viewState.latitude) {
      setViewState(newViewState);
    }
  };

  useEffect(() => {
    // Set the user's current location as coordinates on the map
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      const coords: Coordinates = setMapCenter(pos);
      setPosition(coords);
      getApiData(coords[0], coords[1]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative h-screen">
      <Header
        onClick={handleOnClick}
        toggleUnit={toggleUnit}
        unit={unit}
      />
      <main>
        <Map
          initialViewState={initialViewState}
          viewState={viewState}
          onClick={handleOnClick}
          onMove={handleOnMove}
        >
          <Pin marker={marker}>
            <Card weather={ weatherData } isFetching={ isFetching } unit={ unit }/>
          </Pin>

          <NavigationControl position="bottom-right" showCompass={true} />
        </Map>
      </main>
    </div>
  );
}

export default App;
