import React from "react";

import Search from "./Search";
import digieggs from "../../assets/digieggs.svg";
import star from "../../assets/star.svg";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <img className="logo" src={digieggs} alt="logo" />
        <Search />
        <div className="favorites">
          <img src={star} alt="favorites" className="favorites-icon" />
          <p>Favorites</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
