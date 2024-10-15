import React from "react";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import "../../styles/react-mapbox.css";

type HeaderProps = {
  onClick: (lat: number, lang: number) => void;
}

function Header({ onClick }: HeaderProps) {
  return (
    <header
      className="flex-col space-y-2 lg:space-y-0 lg:flex-row fixed z-50 top-0 bg-grey-100 bg-opacity-80 shadow-elevation-01 w-full text-primary-900 flex justify-between items-center py-3 px-6">
      <div className="text-20 lg:space-x-1 flex items-center justify-between w-full">
        <div className="text-20 lg:space-x-1 flex items-center">
          <img src="/logo.svg" alt="logo" className="h-10 w-10 inline-block mr-2"/>
          <h1>Weather app</h1>
        </div>
        <span className="flex md:hidden">°C - °F</span>
      </div>
      <nav className="text-20 lg:space-x-6 flex flex-col items-center justify-center lg:flex-row space-y-2 lg:space-y-0">
        <MapboxAutocomplete
          placeholder="Search City or Zip Code"
          publicKey={ process.env.REACT_APP_MAPBOX_PUBLIC_KEY }
          inputClass='w-full m-0'
          onSuggestionSelect={ (result: string, lat: number, lang: number) => {
            onClick(lat, lang)
          } }
          resetSearch={ true }
        />
        <span className="w-30 hidden lg:flex">°C - °F</span>
      </nav>
    </header>
  );
}

export default Header;
