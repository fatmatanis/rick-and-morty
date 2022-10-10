import React from "react";
import { useLocation } from "react-router";

import EpisodeCard from "../../components/EpisodeCard";
import TitleCount from "../../components/TitleCount";
import CharacterList from "../../components/CharacterList";
import { IEpisode, ISearchData } from "../../types/types";

function SearchResults() {
  const { state } = useLocation();

  const episodeArray = (state as ISearchData)?.episodes?.results.map(
    (episode: IEpisode) => {
      return (
        <div className="episode-list" key={episode.id}>
          <EpisodeCard
            id={episode.id}
            season={episode.episode}
            date={episode.air_date}
            title={episode.name}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore..."
          />
        </div>
      );
    }
  );

  return (
    <>
      {(state as ISearchData)?.episodes?.results?.length ||
      (state as ISearchData)?.characters?.results?.length > 0 ? (
        <div className="search-results-wrapper">
          <div className="search-results-container">
            <div className="search-characters">
              <div className="search-results-title">Search Results</div>
              <TitleCount
                count={
                  (state as ISearchData)?.characters?.info?.count > 0
                    ? (state as ISearchData)?.characters?.info?.count
                    : 0
                }
                text="Characters"
                link="#"
              />

              {(state as ISearchData)?.characters?.results?.length > 0 ? (
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
            <div className="">
              <TitleCount
                count={
                  (state as ISearchData)?.episodes?.info?.count > 0
                    ? (state as ISearchData)?.episodes?.info?.count
                    : 0
                }
                text="Episodes"
                link="#"
              />
            </div>
            {(state as ISearchData)?.episodes?.results?.length > 0 ? (
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
