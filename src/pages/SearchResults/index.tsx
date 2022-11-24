import React, { useCallback, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { FavoritesContext } from "../../store/favorites-contex";
import { NavSearch } from "../../queries/search";
import EpisodeCard from "../../components/EpisodeCard";
import TitleCount from "../../components/TitleCount";
import CharacterList from "../../components/CharacterList";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IEpisode } from "../../types/types";

function SearchResults() {
  const { episodesList, addEpisodeFavorites, deleteEpisodeFavorites } =
    useContext(FavoritesContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const search = useQuery(NavSearch, {
    variables: {
      filterCharacter: { name: searchQuery },
      filterEpisode: { name: searchQuery }
    }
  });

  const addEpisodeFavHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ({ id, episode, air_date, name }: IEpisode) => {
      addEpisodeFavorites({ id, episode, air_date, name });
    },
    [addEpisodeFavorites]
  );

  const deleteEpisodeFavHandler = useCallback(
    (id: number) => deleteEpisodeFavorites(id),
    [deleteEpisodeFavorites]
  );

  const episodeArray = search.data?.episodes?.results.map(
    (episode: IEpisode) => {
      const isFav =
        episodesList.length > 0 &&
        episodesList.some(found => found.id === episode.id);
      return (
        <div className="episode-list" key={episode.id}>
          <EpisodeCard
            id={episode.id}
            season={episode.episode}
            date={episode.air_date}
            title={episode.name}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."
            favorited={isFav}
            toggleFavorites={() =>
              !isFav
                ? addEpisodeFavHandler({ ...episode })
                : deleteEpisodeFavHandler(episode.id)
            }
          />
        </div>
      );
    }
  );

  const charResultsLength = search.data?.characters?.results?.length;
  const episodeResultsLength = search.data?.episodes?.results?.length;
  const charCount = search.data?.characters?.info?.count;
  const episodeCount = search.data?.episodes?.info?.count;

  if (search.loading) return <LoadingSpinner loadingStyle="arsenic" />;
  if (search.error) return <p className="error">Error :(</p>;

  return (
    <>
      {episodeResultsLength || charResultsLength > 0 ? (
        <div className="search-results-wrapper">
          <div className="search-results-container">
            <div className="search-characters">
              <div className="search-results-title">Search Results</div>
              <TitleCount
                count={charCount > 0 ? charCount : 0}
                text="Characters"
                link={{
                  pathname: `/search/characters/${searchQuery?.toString()}`
                }}
                clickable={true}
              />
              {charResultsLength > 0 ? (
                <div className="home-character-list">
                  <CharacterList
                    characters={search.data?.characters?.results}
                    cardCount={0}
                  />
                </div>
              ) : (
                <div className="no-search">There is no search results.</div>
              )}
            </div>
            <div>
              <TitleCount
                count={episodeCount > 0 ? episodeCount : 0}
                text="Episodes"
                link={{
                  pathname: `/search/episodes/${searchQuery?.toString()}`
                }}
                clickable={true}
              />
            </div>
            {episodeResultsLength > 0 ? (
              <div className="home-episode-list">{episodeArray}</div>
            ) : (
              <div className="no-search">There is no search results.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-search-results">There is no search results.</div>
      )}
    </>
  );
}

export default SearchResults;
