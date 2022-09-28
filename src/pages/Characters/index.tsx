import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetAllCharacters } from "../../queries/characters";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ICharacter } from "../../types/types";

const Characters = () => {
  //   const [characters, setCharacters] = useState<ICharacter[]>([]);
  //   const [nextPage, setNextPage] = useState<number>(0);
  const { loading, error, data, fetchMore } = useQuery(GetAllCharacters, {
    variables: { page: 1 }
  });

  //   useEffect(() => {
  //     if (data?.characters) {
  //       setNextPage(data.characters.info.next);
  //       return setCharacters(data.characters.results);
  //     }
  //   }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">Error :(</p>;

  return (
    <div className="characters-wrapper">
      <div className="characters-container">
        <div className="title-count-container">
          <span className="title-count-text">Characters</span>
          <div className="title-count-number">{data.characters.info.count}</div>
        </div>
        <div>
          <InfiniteScroll
            next={function () {
              throw new Error("Function not implemented.");
            }}
            hasMore={false}
            children={undefined}
            loader={<LoadingSpinner />}
            dataLength={0}
          ></InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Characters;
