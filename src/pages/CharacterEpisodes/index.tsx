import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { useQuery } from "@apollo/client";
import { GetCharacter } from "../../queries/characters";
import Navigation from "../../components/Navigation";
import LoadingSpinner from "../../components/LoadingSpinner";
import Select from "../../components/Select";
import EpisodeCard from "../../components/EpisodeCard";
import { IEpisode } from "../../types/types";

const CharacterEpisodes = () => {
  const [episodes, setEpisodes] = useState<JSX.Element[]>([]);
  const [seasons, setSeasons] = useState<IEpisode[]>([]);
  const [selected, setSelected] = useState<string>("All Seasons");
  const [option, setOption] = useState<string>("S0");
  const location = useLocation();
  const characterId = location.pathname.split("/").slice(2, 3).toString();
  const { loading, error, data } = useQuery(GetCharacter, {
    variables: { id: characterId }
  });

  useEffect(() => {
    if (data) {
      setEpisodes(
        seasons.map((episode: IEpisode) => {
          return (
            <div key={episode.id}>
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
  }, [data, seasons]);

  useEffect(() => {
    if (data) {
      const seaonsData = (prev: IEpisode[]) => {
        if (option !== "S0") {
          prev = data.character.episode.filter(
            ({ episode }: IEpisode) => episode.split("E")[0] === option
          );
          return prev;
        } else {
          return data.character.episode;
        }
      };
      setSeasons(seaonsData);
    }
  }, [data, option, loading]);

  const options = Array.from(Array(6).keys()).map(item => ({
    label: item !== 0 ? `Season ${item}` : "All Seasons",
    value: `S0${item !== 0 ? item : ""}`,
    handleSelect(event: React.MouseEvent) {
      setOption((event.target as HTMLButtonElement).value);
      setSelected((event.target as HTMLButtonElement).innerText);
    }
  }));

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">Error :(</p>;

  return (
    <div className="character-episodes-wrapper">
      <div className="character-episodes-container">
        <div className="character-episodes-top">
          <Navigation colorStyles="black" />
          <span className="character-name-character">
            {data.character.name}
          </span>
        </div>
        <div className="character-episodes-content">
          <div className="character-episodes-left">
            <img
              className="character-image-character"
              src={data.character.image}
              alt={data.character.name}
            />
            <Select options={options} filtered={selected} />
          </div>
          <div className="character-episodes-list-episodes">
            <div className="character-episodes-list">{episodes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterEpisodes;
