import React, { useCallback, useContext, useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { GetAllCharacters } from "../../queries/characters";
import { GetAllEpisodes } from "../../queries/episodes";
import { FavoritesContext } from "../../store/favorites-contex";
import LoadingSpinner from "../../components/LoadingSpinner";
import TitleCount from "../../components/TitleCount";
import EpisodeCard from "../../components/EpisodeCard";
import CharacterList from "../../components/CharacterList";
import { IEpisode } from "../../types/types";

const Home = () => {
  const [episode, setEpisode] = useState<JSX.Element[]>([]);
  const { episodesList, addEpisodeFavorites, deleteEpisodeFavorites } =
    useContext(FavoritesContext);
  const characters = useQuery(GetAllCharacters, {
    variables: { page: 1 }
  });
  const episodes = useQuery(GetAllEpisodes, {
    variables: { page: 1 }
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

  useEffect(() => {
    if (episodes.data) {
      const episodeData = episodes.data.episodes.results
        .slice(0, 6)
        .map((episode: IEpisode) => {
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
        });
      setEpisode(episodeData);
    }
  }, [
    addEpisodeFavHandler,
    deleteEpisodeFavHandler,
    episodes.data,
    episodesList
  ]);

  if (characters.loading || episodes.loading)
    return <LoadingSpinner loadingStyle="arsenic" />;
  if (characters.error || episodes.error)
    return <p className="error">Error :(</p>;

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-characters">
          <div className="title-count-wrapper">
            <TitleCount
              link="/characters"
              text="Characters"
              count={characters.data.characters.info.count}
            />
          </div>
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
