import React, { useState } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import Pin from "./components/Pin";
import Card from "./components/Card";
import { NavigationControl } from "react-map-gl";
import { Coordinates, TemperatureUnitEnum, ViewStateProps } from "./types";
import { initialCoordinates, initialViewState } from "./store/initialData";

function App() {
  const initialTempUnit: string | null = window.localStorage.getItem('temperatureUnit');
  const [unit, setUnit] = useState<TemperatureUnitEnum>( initialTempUnit && JSON.parse(initialTempUnit) ? JSON.parse(initialTempUnit) : 'celsius');
  const [viewState, setViewState] = useState<ViewStateProps>(initialViewState);
  const [position, setPosition] = useState<Coordinates>(initialCoordinates);

  const handleOnClick = (lat: number, long: number) => {
    setPosition([lat, long]);
    setViewState(prevState => ({
      ...prevState,
      longitude: long,
      latitude: lat,
      zoom: 8,
    }));
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
          <Pin marker={position}>
            <Card position={position} unit={unit}/>
          </Pin>

          <NavigationControl position="bottom-right" showCompass={true} />
        </Map>
      </main>
    </div>
  );
}

export default App;
