import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Map, { ViewStateProps } from "./components/Map/Map";
import { fetchWeatherData } from "./api/fetchWeatherData";

export type TemperatureUnitEnum = 'celsius' | 'fahrenheit';
export type Coordinates = number[];
export type WeatherData = {
  city: string,
  country: string,
  temperature: string,
  description: string,
  icon: string
}

const initialCoordinates: Coordinates =  [55.676098, 12.568337];
const initialViewState: ViewStateProps = {
  latitude: 55.676098,
  longitude: 12.568337,
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
  const [unit, setUnit] = useState<TemperatureUnitEnum>('celsius');

  const [viewState, setViewState] = useState<ViewStateProps>(initialViewState);
  const [marker, setMarker] = useState<Coordinates>(setMapCenter(position));
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);

  const getApiData = async (lat: number, long: number) => await fetchWeatherData(lat, long, setWeatherData);
  const handleOnClick = async (lat: number, long: number) => {
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

  const toggleUnit = () => { setUnit(unit === 'fahrenheit' ? 'celsius' : 'fahrenheit') };

  const handleOnMove = (viewState: ViewStateProps) => setViewState(viewState);

  useEffect(() => {
    getApiData(setMapCenter(position)[0], setMapCenter(position)[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative h-screen">
      <Header onClick={handleOnClick} toggleUnit={toggleUnit} unit={unit} />
      <main>
        <Map
          unit={unit}
          initialViewState={initialViewState}
          viewState={viewState}
          marker={marker}
          onClick={handleOnClick}
          onMove={handleOnMove}
          weatherData={weatherData}
        />
      </main>
    </div>
  );
}

export default App;
