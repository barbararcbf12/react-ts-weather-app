import React, { memo } from "react";
import { TemperatureUnitEnum } from "../types";
import SearchWithSuggestions from "./SearchWithSuggestions";

type HeaderProps = {
  onClick: (lat: number, lang: number) => void;
  toggleUnit: () => void;
  unit: TemperatureUnitEnum;
};

function Header({ onClick, toggleUnit, unit }: HeaderProps) {
  const handleOnSuggestionSelect = (result: string, lat: number, lang: number) => onClick(lat, lang);
  const handlToggleTempUnit = ()  => toggleUnit();

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
          <img src="/logo.svg" alt="Weather app logo" className="h-10 w-10 inline-block mr-2" aria-hidden="true"/>
          <h1>Weather app</h1>
        </div>
        <span className="flex lg:hidden">
          { buttonToggle }
        </span>
      </div>
      <nav className="text-20 lg:space-x-6 flex flex-col items-center justify-center lg:flex-row space-y-2 lg:space-y-0">
        <SearchWithSuggestions onChange={handleOnSuggestionSelect} />
        <div className="w-30 hidden lg:flex">
          { buttonToggle }
        </div>
      </nav>
    </header>
  );
}

export default memo(Header);
