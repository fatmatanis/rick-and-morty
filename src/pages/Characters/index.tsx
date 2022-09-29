import React from "react";

import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetAllCharacters } from "../../queries/characters";
import LoadingSpinner from "../../components/LoadingSpinner";
import CharacterList from "../../components/CharacterList";

const Characters = () => {
  const { loading, error, data, fetchMore } = useQuery(GetAllCharacters, {
    variables: { page: 1 }
  });

  const nextPage = data?.characters?.info?.next;

  const loadMore = () => {
    fetchMore({
      variables: { page: nextPage },
      updateQuery: (prevResults, { fetchMoreResult }) => {
        fetchMoreResult.characters.results = [
          ...prevResults.characters.results,
          ...fetchMoreResult.characters.results
        ];
        return fetchMoreResult;
      }
    });
  };

  if (loading) return <LoadingSpinner loadingStyle="arsenic" />;
  if (error) return <p className="error">Error :(</p>;

  return (
    <div className="characters-wrapper">
      <div className="characters-container">
        <div className="title-count-container">
          <span className="title-count-text">Characters</span>
          <div className="title-count-number">{data.characters.info.count}</div>
        </div>
        <div className="characters-list-results">
          <InfiniteScroll
            next={loadMore}
            hasMore={nextPage !== null}
            loader={<LoadingSpinner loadingStyle="transparent" />}
            dataLength={data?.characters?.results?.length}
          >
            <CharacterList
              characters={data?.characters?.results}
              cardCount={0}
            />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Characters;
