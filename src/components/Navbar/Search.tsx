import React from "react";
import { INavbarProps } from "../../types/types";

const Search = ({ className, searchValue, handleChange }: INavbarProps) => {
  return (
    <input
      type="search"
      placeholder="Search"
      className={className}
      value={searchValue}
      onChange={handleChange}
    />
  );
};

export default Search;
