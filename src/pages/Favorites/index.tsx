import React, { useContext } from "react";

import CharacterList from "../../components/CharacterList";
import EpisodeCard from "../../components/EpisodeCard";
import TitleCount from "../../components/TitleCount";
import { FavoritesContext } from "../../store/favorites-contex";
import { IEpisode } from "../../types/types";

const Favorites = () => {
  const { episodesList, charactersList } = useContext(FavoritesContext);

  const episodeListArr = episodesList.map((episode: IEpisode) => {
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
  });

  return (
    <div className="favorites-wrapper">
      <div className="favorites-container">
        <span className="favorites-text">Favorites</span>
        <div className="favorites-characters">
          <TitleCount
            link="#"
            text="Characters"
            count={charactersList.length}
          />
          <div className="home-character-list">
            <CharacterList characters={charactersList} cardCount={0} />
          </div>
        </div>
        <div>
          <TitleCount link="#" text="Episodes" count={episodeListArr.length} />
          <div className="home-episode-list">{episodeListArr}</div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
