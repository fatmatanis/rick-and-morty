import React from "react";

import { ReactComponent as Star } from "../../assets/star.svg";
import { IFavoriteButtonProps } from "../../types/types";

const FavoriteButton = ({ favStyle }: IFavoriteButtonProps) => {
  return (
    <div className={`favorite-button ${favStyle}`}>
      <div className="favorite-button-content">
        <Star className="favorite-star" />
        <span className="favorite-button-text">Add your favorite</span>
      </div>
    </div>
  );
};

export default FavoriteButton;
