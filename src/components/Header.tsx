import React from "react";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import "../styles/react-mapbox.css";
import { TemperatureUnitEnum } from "../types";

type HeaderProps = {
  onClick: (lat: number, lang: number) => void;
  toggleUnit: () => void;
  unit: TemperatureUnitEnum;
};

const PUBLIC_KEY = process.env.REACT_APP_MAPBOX_PUBLIC_KEY;

function Header({ onClick, toggleUnit, unit }: HeaderProps) {

  function handleOnSuggestionSelect(result: string, lat: number, lang: number) {
    onClick(lat, lang);
  }

  function handlToggleTempUnit() {
    toggleUnit();
  }

  const buttonToggle = (
    <button onClick={ handlToggleTempUnit } className="flex w-full rounded-desktop overflow-hidden">
      <span
        className={ unit === 'celsius' ? 'py-1 px-3 bg-green-600 text-grey-100' : 'py-1 px-3 bg-grey-300 text-grey-200' }>°C</span>
      <span
        className={ unit === 'fahrenheit' ? 'py-1 px-3 bg-green-600 text-grey-100' : 'py-1 px-3 bg-grey-300 text-grey-200' }>°F</span>
    </button>
  );

  return (
    <header
      className="flex-col space-y-2 lg:space-y-0 lg:flex-row fixed z-50 top-0 bg-grey-100 bg-opacity-80 shadow-elevation-01 w-full text-primary-900 flex justify-between items-center py-3 px-6">
      <div className="text-20 lg:space-x-1 flex items-center justify-between w-full">
        <div className="text-20 lg:space-x-1 flex items-center">
          <img src="/logo.svg" alt="logo" className="h-10 w-10 inline-block mr-2"/>
          <h1>Weather app</h1>
        </div>
        <span className="flex lg:hidden">
          { buttonToggle }
        </span>
      </div>
      <nav className="text-20 lg:space-x-6 flex flex-col items-center justify-center lg:flex-row space-y-2 lg:space-y-0">
        <MapboxAutocomplete
          placeholder="Search City or Zip Code"
          publicKey={ PUBLIC_KEY }
          inputClass='w-full m-0'
          onSuggestionSelect={ handleOnSuggestionSelect }
          resetSearch={ true }
        />
        <div className="w-30 hidden lg:flex">
          { buttonToggle }
        </div>
      </nav>
    </header>
  );
}

export default Header;
