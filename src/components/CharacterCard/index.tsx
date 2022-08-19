import React from "react";
import { Link } from "react-router-dom";

const CharacterCard = () => {
  return (
    <div className="character-card">
      <Link to="/" className="character-card-link">
        <div className="character-card-image-wrapper">
          <img className="character-card-image" src="" alt="" />
          <span className="character-card-origin">Origin</span>
          <span className="character-card-species">Spacies</span>
        </div>
      </Link>
      <span className="character-card-name">Rick Sanchez</span>
    </div>
  );
};

export default CharacterCard;
