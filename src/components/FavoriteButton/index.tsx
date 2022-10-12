import React from "react";

import { ReactComponent as Star } from "../../assets/star.svg";
import { IFavoriteButtonProps } from "../../types/types";

const FavoriteButton = ({
  favStyle,
  favorited,
  toggleFavorites
}: IFavoriteButtonProps) => {
  return (
    <div className={`favorite-button ${favStyle}`} onClick={toggleFavorites}>
      <div className="favorite-button-content">
        <Star className={`favorite-star ${favorited && "favStar"}`} />
        <span className="favorite-button-text">Add your favorites</span>
      </div>
    </div>
  );
};

export default FavoriteButton;
