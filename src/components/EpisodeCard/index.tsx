import React from "react";

import star from "../../assets/star.svg";

const EpisodeCard = () => {
  return (
    <div className="episode-card">
      <div className="episode-card-container">
        <div className="episode-card-box">
          <div className="episode-card-season">S2.E10</div>
          <div className="episode-card-date">Fri, July 32, 2020</div>
        </div>
        <img
          className="episode-card-star-icon"
          src={star}
          alt="star-icon"
        ></img>
      </div>
      <div>
        <div className="episode-card-title">The End of Something</div>
        <div className="episode-card-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore...
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
