import React from "react";

function Header() {
  return (
    <header className="fixed z-50 top-0 bg-grey-100 bg-opacity-80 shadow-elevation-01 w-full text-primary-900 flex justify-between items-center py-3 px-6">
      <div className="text-20">Weather app</div>
      <nav>
        <input type="search" className="rounded-mobile w-80" placeholder="Search City or Zip Code"/>
      </nav>
    </header>
  );
}

export default Header;
