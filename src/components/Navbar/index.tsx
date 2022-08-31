import React from "react";
import { Link } from "react-router-dom";

import Search from "./Search";
import { ReactComponent as Digieggs } from "../../assets/digieggs.svg";
import { ReactComponent as Star } from "../../assets/star.svg";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="navbar">
        <Link to="/">
          <Digieggs className="logo" />
        </Link>
        <Search className="search" />
        <Link to="/favorites" className="favorite-link">
          <Star className="favorites-icon" />
          <p className="favorite-text">Favorites</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
