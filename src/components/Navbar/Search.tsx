import React from "react";
import { INavbarProps } from "../../types/types";

const Search = ({ className }: INavbarProps) => {
  return <input type="search" placeholder="Search" className={className} />;
};

export default Search;
