import React from "react";
import { Link } from "react-router-dom";

import { ICharacterCardProps } from "../../types/types";

const CharacterCard = ({
  id,
  image,
  name,
  origin,
  species
}: ICharacterCardProps) => {
  return (
    <div className="character-card">
      <Link to={`/characters/${id}`} className="character-card-link">
        <div className="character-card-image-wrapper">
          <img className="character-card-image" src={image} alt={name} />
          <span className="character-card-origin">{origin}</span>
          <span className="character-card-species">{species}</span>
        </div>
      </Link>
      <span className="character-card-name">{name}</span>
    </div>
  );
};

export default CharacterCard;
