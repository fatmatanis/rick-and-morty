import React from "react";
import { INavbarProps } from "../../types/types";

const Search = ({ styleName }: INavbarProps) => {
  return <input type="search" placeholder="Search" className={styleName} />;
};

export default Search;
