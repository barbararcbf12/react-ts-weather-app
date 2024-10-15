import React from "react";

function Header() {
  return (
    <header className="bg-grey-100 shadow-elevation-01 w-full text-primary-900 flex justify-between items-center py-3 px-6 sticky z-100 top-0">
      <div className="text-20">App's name</div>
      <nav>
        <ul className="flex">
          <li className="flex">
            <a href="/#">item 1</a>
          </li>
          <li className="flex before:content-['|'] before:px-2">
            <a href="/#">item 2</a>
          </li>
          <li className="flex before:content-['|'] before:px-2">
            <a href="/#">item 3</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
