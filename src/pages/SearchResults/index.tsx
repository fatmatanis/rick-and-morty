import React, { useCallback, useContext } from "react";
import { useLocation } from "react-router";

import { FavoritesContext } from "../../store/favorites-contex";
import EpisodeCard from "../../components/EpisodeCard";
import TitleCount from "../../components/TitleCount";
import CharacterList from "../../components/CharacterList";
import { IEpisode, ISearchData } from "../../types/types";

function SearchResults() {
  const { episodesList, addEpisodeFavorites, deleteEpisodeFavorites } =
    useContext(FavoritesContext);
  const { state } = useLocation();

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

  const episodeArray = (state as ISearchData)?.episodes?.results.map(
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

  const charResultsLength = (state as ISearchData)?.characters?.results?.length;
  const episodeResultsLength = (state as ISearchData)?.episodes?.results
    ?.length;
  const charCount = (state as ISearchData)?.characters?.info?.count;
  const episodeCount = (state as ISearchData)?.episodes?.info?.count;

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
                link="#"
                clickable={false}
              />
              {charResultsLength > 0 ? (
                <div className="home-character-list">
                  <CharacterList
                    characters={(state as ISearchData)?.characters?.results}
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
                link="#"
                clickable={false}
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
