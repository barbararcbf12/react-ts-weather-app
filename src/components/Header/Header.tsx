import React from "react";

function Header() {
  return (
    <header className="flex-col space-y-2 md:space-y-0 md:flex-row fixed z-50 top-0 bg-grey-100 bg-opacity-80 shadow-elevation-01 w-full text-primary-900 flex justify-between items-center py-3 px-6">
      <div className="text-20 md:space-x-1 flex items-center justify-between w-full">
        <div className="text-20 md:space-x-1 flex items-center">
          <img src="/logo.svg" alt="logo" className="h-10 w-10 inline-block mr-2"/>
          <h1>Weather app</h1>
        </div>
        <span className="flex md:hidden">°C - °F</span>
      </div>
      <nav className="text-20 md:space-x-6 flex flex-col items-center justify-center md:flex-row space-y-2 md:space-y-0">
        <input type="search" className="rounded-mobile w-80" placeholder="Search City or Zip Code"/>
        <span className="w-20 hidden md:flex">°C - °F</span>
      </nav>
    </header>
  );
}

export default Header;
