import React from "react";
import { NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <header className="flex items-center justify-between py-5 text-[1.2rem] px-10 bg-red-500 text-white">
      <div>Logo</div>
      <ul className="flex items-center gap-4">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Layout;
