import React from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg";
import { INavigationProps } from "../../types/types";

const Navigation = ({ colorStyles }: INavigationProps) => {
  const location = useLocation();

  const pageUrl = location.pathname.split("/").slice(1);

  let locationUrl: string;

  const urlsArray = pageUrl.map((url, index) => {
    if (index === 0) {
      locationUrl = url;
      return url;
    } else {
      locationUrl += `/${url}`;
      return locationUrl;
    }
  });

  const urlTitle: string[] = [];

  for (let i = 0; i < pageUrl.length; i++) {
    urlTitle.push(
      pageUrl[i].charAt(0).toUpperCase().split(" ") +
        pageUrl[i].slice(1).split("-").join(" ")
    );
  }

  const characterArray = urlsArray.map((characterUrl, i) => (
    <div className="navigation-wrapper" key={i}>
      <Link
        to={`/${characterUrl}`}
        className={`navigation-link ${colorStyles}`}
      >
        {urlTitle[i]}
        <RightArrow className="navigation-icon" />
      </Link>
    </div>
  ));
  return (
    <div className="c">
      <div className="navigation">{characterArray}</div>{" "}
    </div>
  );
};

export default Navigation;
