import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Star } from "../../assets/star.svg";
import { IEpisodeCardProps } from "../../types/types";

const EpisodeCard = ({
  id,
  season,
  date,
  title,
  description
}: IEpisodeCardProps) => {
  return (
    <div className="episode-card">
      <div className="episode-card-container">
        <button className="episode-card-favorite-button">
          <Star />
        </button>
        <Link className="episode-card-link" to={`/episodes/${id}`}>
          <div className="episode-card-top">
            <span className="episode-card-season">{season}</span>
            <span className="episode-card-date">{date}</span>
          </div>
          <div className="episode-card-bottom">
            <span className="episode-card-title">{title}</span>
            <span className="episode-card-description">{description}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EpisodeCard;
