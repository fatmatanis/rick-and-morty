import React from "react";
import { Link } from "react-router-dom";

import rightArrow from "../../assets/rightArrow.svg";
import { ITitleCountProps } from "../../types/types";

const TitleCount = ({ link, text, count, clickable }: ITitleCountProps) => {
  return (
    <div className="title-count-wrapper">
      <Link
        to={link}
        className={`${clickable ? "title-count-link " : "disable"}`}
      >
        <div className="title-count-container">
          <div className="title-count-text">{text}</div>
          <div className="title-count-number">{count}</div>
          <img className="right-arrow" src={rightArrow} alt="right-arrow" />
        </div>
      </Link>
    </div>
  );
};

export default TitleCount;
