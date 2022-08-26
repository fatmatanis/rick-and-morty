import React from "react";

import { ReactComponent as Globe } from "../../assets/globe.svg";
import { ILocationCardProps } from "../../types/types";

const LocationCard = ({ name, type, dimension }: ILocationCardProps) => {
  return (
    <div className="location-card-wrapper">
      <div className="location-card-container">
        <Globe />
        <span className="location-name">{name}</span>
        <span className="location-type">{type}</span>
      </div>
      <span className="location-dimension">{dimension}</span>
    </div>
  );
};

export default LocationCard;
