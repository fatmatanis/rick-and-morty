import React from "react";
import { useLocation } from "react-router-dom";

import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavSearch } from "../../queries/search";
import LoadingSpinner from "../../components/LoadingSpinner";
import CharacterList from "../../components/CharacterList";

const SearchCharacterResults = () => {
  const location = useLocation();
  const locationSearch = location.search
    .split("?")
    .slice(1)
    .toString()
    .split("%20")
    .join(" ");
  const { data, loading, error, fetchMore } = useQuery(NavSearch, {
    variables: {
      filterCharacter: { name: locationSearch },
      page: 1
    }
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
    <>
      {data?.characters?.results?.length > 0 ? (
        <div className="characters-wrapper">
          <div className="characters-container">
            <div className="title-count-container">
              <span className="title-count-text">Characters</span>
              <div className="title-count-number">
                {data.characters.info.count}
              </div>
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
      ) : (
        <div className="no-search-results">There is no search results.</div>
      )}
    </>
  );
};

export default SearchCharacterResults;
