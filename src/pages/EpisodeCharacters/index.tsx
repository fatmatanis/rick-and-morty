import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GetEpisode } from "../../queries/episodes";
import TitleCount from "../../components/TitleCount";
import CharacterList from "../../components/CharacterList";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ReactComponent as LeftArrow } from "../../assets/leftArrow.svg";
import { ICharacter } from "../../types/types";

const EpisodeCharacters = () => {
  const [charactersArr, setCharactersArr] = useState<ICharacter[]>([]);
  const location = useLocation();
  const episodelocation = location.pathname.split("/").slice(2).toString();
  const episodeId = parseInt(episodelocation);
  const { loading, error, data } = useQuery(GetEpisode, {
    variables: { id: episodeId }
  });

  useEffect(() => {
    if (data) {
      setCharactersArr(data.episode.characters);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">Error :(</p>;

  return (
    <div className="episode-characters-wrapper">
      <div className="episode-characters-container">
        <Link to={`/episodes/${episodeId}`} className="episode-detail-page">
          <LeftArrow className="episode-detail-page-arrow" />
          <span className="episode-detail-page-text">Episode Detail</span>
        </Link>
        <div className="episode-charters-list">
          <div className="home-characters">
            <TitleCount
              link="#"
              text="Characters"
              count={charactersArr.length}
            />
            <div className="home-character-list">
              <CharacterList
                characters={data.episode.characters}
                cardCount={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCharacters;
