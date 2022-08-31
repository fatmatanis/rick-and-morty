import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { GetAllCharacters } from "../../queries/characters";
import LoadingSpinner from "../../components/LoadingSpinner";
import TitleCount from "../../components/TitleCount";
import CharacterList from "../../components/CharacterList";
import { GetAllEpisodes } from "../../queries/episodes";
import { IEpisode } from "../../types/types";
import EpisodeCard from "../../components/EpisodeCard";

const Home = () => {
  const [episode, setEpisode] = useState<JSX.Element[]>([]);
  const characters = useQuery(GetAllCharacters, {
    variables: { page: 1 }
  });
  const episodes = useQuery(GetAllEpisodes, {
    variables: { page: 1 }
  });

  useEffect(() => {
    if (episodes.data) {
      setEpisode(
        episodes.data.episodes.results.slice(0, 6).map((episode: IEpisode) => {
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
        })
      );
    }
  }, [episodes.data]);

  if (characters.loading || episodes.loading) return <LoadingSpinner />;
  if (characters.error || episodes.error)
    return <p className="error">Error :(</p>;

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-characters">
          <TitleCount
            link="/characters"
            text="Characters"
            count={characters.data.characters.info.count}
          />
          <div className="home-character-list">
            <CharacterList
              characters={characters.data.characters.results}
              cardCount={8}
            />
          </div>
        </div>
        <div className="home-episodes">
          <TitleCount
            link="/episodes"
            text="Episodes"
            count={episodes.data.episodes.info.count}
          />
          <div className="home-episode-list">{episode}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
