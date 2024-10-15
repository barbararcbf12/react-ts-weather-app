import React from "react";

function Header() {
  return (
    <header className="fixed z-50 top-0 bg-grey-100 bg-opacity-80 shadow-elevation-01 w-full text-primary-900 flex justify-between items-center py-3 px-6">
      <div className="text-20 space-x-1">
        <img src="/logo.svg" alt="logo" className="h-10 w-10 inline-block mr-2"/>
        <span>Weather app</span>
      </div>
      <nav className="text-20 space-x-6">
        <input type="search" className="rounded-mobile w-80" placeholder="Search City or Zip Code"/>
        <span>°C - °F</span>
      </nav>
    </header>
  );
}

export default Header;
