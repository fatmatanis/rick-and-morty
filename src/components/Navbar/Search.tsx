import React from "react";
import { INavbarProps } from "../../types/types";

const Search = React.forwardRef<HTMLInputElement, INavbarProps>(
  ({ className, searchValue, handleChange }, ref) => {
    return (
      <input
        type="search"
        ref={ref}
        placeholder="Search"
        className={className}
        value={searchValue}
        onChange={handleChange}
      />
    );
  }
);

export default Search;
