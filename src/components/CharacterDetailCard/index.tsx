import React from "react";
import { ICharacterDetailCardProps } from "../../types/types";

const CharacterDetailCard = ({ title, text }: ICharacterDetailCardProps) => {
  return (
    <div className="character-detail">
      <div className="character-detail-title">{title}</div>
      <div className="character-detail-text">{text}</div>
    </div>
  );
};

export default CharacterDetailCard;
