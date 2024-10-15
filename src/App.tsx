import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import { fetchWeatherData } from "./api/fetchWeatherData";
import Pin from "./components/Pin/Pin";
import Card from "./components/Card/Card";
import { ViewState } from "react-map-gl";

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
const initialCoordinates: Coordinates =  [55.676098, 12.568337];
const initialViewState: ViewStateProps = {
  latitude: initialCoordinates[0],
  longitude: initialCoordinates[1],
  zoom: 10,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
  width: 100,
  height: 100
};

const setMapCenter = (position: GeolocationPosition): Coordinates => {
  if(position) return [position.coords.latitude, position.coords.longitude];
  else return initialCoordinates;
};

const position: any = navigator.geolocation.getCurrentPosition(setMapCenter);

function App() {
  const initialTempUnit: string | null = window.localStorage.getItem('temperatureUnit');
  const [unit, setUnit] = useState<TemperatureUnitEnum>( initialTempUnit && JSON.parse(initialTempUnit) ? JSON.parse(initialTempUnit) : 'celsius');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [viewState, setViewState] = useState<ViewStateProps>(initialViewState);
  const [marker, setMarker] = useState<Coordinates>(setMapCenter(position));
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

  const handleOnMove = (viewState: ViewStateProps) => setViewState(viewState);

  useEffect(() => {
    getApiData(setMapCenter(position)[0], setMapCenter(position)[1]);
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
        </Map>
      </main>
    </div>
  );
}

export default App;
