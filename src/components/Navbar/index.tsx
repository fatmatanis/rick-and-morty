import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import _ from "lodash";
import Search from "./Search";
import { NavSearch } from "../../queries/search";
import { ReactComponent as Digieggs } from "../../assets/digieggs.svg";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ICharacter, IEpisode } from "../../types/types";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownArray, setDropdownArray] = useState([]);
  const navigate = useNavigate();
  const [search, { data }] = useLazyQuery(NavSearch);

  console.log("select", searchValue);

  const handleSearch = useCallback(
    (e: string) => {
      setSearchValue(e);
      search({
        variables: {
          filterCharacter: {
            name: e
          },
          filterEpisode: {
            name: e
          }
        }
      });
    },
    [search]
  );

  const debouncer = useMemo(
    () => _.debounce(handleSearch, 500),
    [handleSearch]
  );

  useEffect(() => {
    if (data) {
      const dropdownCharsArray = Object.values(data?.characters?.results).slice(
        0,
        4
      );
      const dropdownEpisodesArray = Object.values(
        data?.episodes?.results
      ).slice(0, 4);

      setDropdownArray(
        (dropdownCharsArray as []).concat(dropdownEpisodesArray as [])
      );
      navigate("/search", { state: data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <nav className="nav">
        <div className="navbar">
          <Link to="/">
            <Digieggs className="logo" />
          </Link>
          <Search
            className="search"
            handleChange={e => debouncer(e.target.value)}
          />
          <Link to="/favorites" className="favorite-link">
            <Star className="favorites-icon" />
            <p className="favorite-text">Favorites</p>
          </Link>
        </div>
      </nav>
      <div className="navbar-dropdown">
        <div
          className={`navbar-dropdown-wrapper ${
            dropdownArray.length > 0 && searchValue !== "" ? "focus" : ""
          } `}
        >
          <div className="navbar-dropdown-container">
            {dropdownArray.map((item: ICharacter | IEpisode, index: number) => (
              <button
                key={index}
                className="navbar-dropdown-item"
                onClick={event => {
                  setDropdownArray([]);
                  handleSearch((event.target as HTMLButtonElement).innerText);
                  setSearchValue((event.target as HTMLButtonElement).innerText);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
