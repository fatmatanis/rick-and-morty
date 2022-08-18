import React from "react";
import { ICharacterDetailCardProps } from "../../types/types";

const CharacterDetailCard = ({ title, text }: ICharacterDetailCardProps) => {
  return (
    <div className="character-detail">
      <span className="character-detail-title">{title}</span>
      <span className="character-detail-text">{text}</span>
    </div>
  );
};

export default CharacterDetailCard;
