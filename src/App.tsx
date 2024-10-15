import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import { fetchWeatherData } from "./api/fetchWeatherData";
import Pin from "./components/Pin";
import Card from "./components/Card";
import { NavigationControl } from "react-map-gl";
import { Coordinates, TemperatureUnitEnum, ViewStateProps, WeatherData } from "./types";
import { initialCoordinates, initialViewState } from "./store/initialData";

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

  const handleOnClick = async (lat: number, long: number) => {
    setMarker([lat, long]);
    setViewState( (prevState) => ({
        ...prevState,
        longitude: long,
        latitude: lat,
        zoom: 8
      }
    ));
    const data = await fetchWeatherData(lat, long);
    setWeatherData(data);
  };

  const toggleUnit = () => {
    const toggledTemp = unit === TemperatureUnitEnum.Fahrenheit ? TemperatureUnitEnum.Celsius : TemperatureUnitEnum.Fahrenheit;
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
    navigator.geolocation.getCurrentPosition(async (pos: GeolocationPosition) => {
      const coords: Coordinates = setMapCenter(pos);
      setPosition(coords);
      setIsFetching(true);
      const data = await fetchWeatherData(coords[0], coords[1]);
      if(data) {
        setWeatherData(data);
        setIsFetching(false);
      }
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
