import React from "react";
import { Link } from "react-router-dom";

import rightArrow from "../../assets/rightArrow.svg";

const TitleCount = () => {
  return (
    <Link to="/" className="title-count-link">
      <div className="title-count-container">
        <div className="title-count-text">Character</div>
        <div className="title-count-number">43</div>
        <img className="right-arrow" src={rightArrow} alt="right-arrow" />
      </div>
    </Link>
  );
};

export default TitleCount;
