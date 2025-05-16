import React from "react";
import user from "../assets/user-icon.svg"
import logo from "../assets/logo.svg"
function Navbar() {

  return (
    <nav className="bg-[rgba(89,86,86,0.29)] rounded-full px-8 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-[#FF602C] mr-2">
          <img src={logo} alt="DineOut Logo" />
        </div>
        <h1 className="text-2xl font-bold">
          <span className="text-[#FF602C]">Dine</span>Out
        </h1>
      </div>
      <div className="flex items-center">
        <img src={user} alt="User" className="h-10" />
      </div>
    </nav>
  );
}

export default Navbar;