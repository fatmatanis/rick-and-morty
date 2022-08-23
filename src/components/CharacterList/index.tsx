import React from "react";
import CharacterCard from "../CharacterCard";

import { ICharacterListProps } from "../../types/types";

const CharacterList = ({ characters, cardCount }: ICharacterListProps) => {
  let characterCount;
  if (cardCount > 0) {
    characterCount = characters.slice(0, cardCount);
  } else {
    characterCount = characters;
  }

  return (
    <div className="character-list">
      {characterCount.map(({ id, image, name, origin, species }) => (
        <CharacterCard
          key={id}
          id={id}
          image={image}
          name={name}
          origin={origin.name}
          species={species}
        />
      ))}
    </div>
  );
};

export default CharacterList;
