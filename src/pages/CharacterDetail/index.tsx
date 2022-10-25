import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

import { useQuery } from "@apollo/client";
import { GetCharacter } from "../../queries/characters";
import { FavoritesContext } from "../../store/favorites-contex";
import Navigation from "../../components/Navigation";
import LoadingSpinner from "../../components/LoadingSpinner";
import FavoriteButton from "../../components/FavoriteButton";
import CharacterDetailCard from "../../components/CharacterDetailCard";
import EpisodeCard from "../../components/EpisodeCard";
import TitleCount from "../../components/TitleCount";
import NotFound from "../NotFound";
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg";
import { ICharacterDetail, IEpisode } from "../../types/types";

function CharacterDetail() {
  const [characterDetail, setCharacterDetail] = useState<ICharacterDetail[]>(
    []
  );
  const [array, setArray] = useState<JSX.Element[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [episodes, setEpisodes] = React.useState<JSX.Element[]>([]);
  const {
    charactersList,
    episodesList,
    addCharFavorites,
    deleteCharFavorites,
    addEpisodeFavorites,
    deleteEpisodeFavorites
  } = useContext(FavoritesContext);
  const location = useLocation();
  const pageUrlId = location.pathname.split("/").slice(2).toString();
  const { loading, error, data } = useQuery(GetCharacter, {
    variables: { id: pageUrlId }
  });

  const carouselInfiniteScroll = () => {
    if (currentIndex === data.character.episode.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

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
    if (data?.character === null) return;
    if (data) {
      const characterDetailArr = [
        { title: "Status", text: data.character.status },
        { title: "Gender", text: data.character.gender },
        { title: "Species", text: data.character.species },
        { title: "Origin", text: data.character.origin.name },
        {
          title: "Type",
          text: data.character.type === "" ? "Unknown" : data.character.type
        },
        { title: "Location", text: data.character.location.name }
      ];
      setCharacterDetail(characterDetailArr);

      const episodesArr = data.character.episode.map((episode: IEpisode) => {
        const isFav =
          episodesList.length > 0 &&
          episodesList.some(found => found.id === episode.id);
        return (
          <div className="character-episode-list" key={episode.id}>
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
      setEpisodes(episodesArr);
    }
  }, [addEpisodeFavHandler, data, deleteEpisodeFavHandler, episodesList]);

  useEffect(() => {
    if (characterDetail?.length > 0) {
      setArray(
        characterDetail.map(({ title, text }: ICharacterDetail, index) => {
          return (
            <div className="character-detail-content-item" key={index}>
              <CharacterDetailCard title={title} text={text} />
            </div>
          );
        })
      );
    }
  }, [characterDetail]);

  const isFav =
    charactersList.length > 0 &&
    charactersList.some(character => character.id === data?.character?.id);

  const addCharFavHandler = () => {
    addCharFavorites(data?.character);
  };

  const deleteCharFavHandler = () => {
    deleteCharFavorites(data?.character?.id);
  };

  if (loading) return <LoadingSpinner loadingStyle="arsenic" />;
  if (error) return <p className="error">Error :(</p>;
  if (data?.character === null) return <NotFound />;

  return (
    <>
      <div className="character-detail-top">
        <div className="character-detail-character">
          <Navigation colorStyles="white" />
          <div className="character-name-wrapper">
            <span className="character-name">{data.character.name}</span>
            <FavoriteButton
              favStyle="green"
              favorited={isFav}
              toggleFavorites={
                !isFav ? addCharFavHandler : deleteCharFavHandler
              }
            />
          </div>
          <div className="character-detail-content">
            <img
              className="character-image"
              src={data.character.image}
              alt={data.character.name}
            />
            <div className="character-detail-content-array">{array}</div>
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="character-episodes-wrapper">
          <div className="character-episodes-title">
            <TitleCount
              link={`/characters/${data.character.id}/episodes`}
              text="Episodes"
              count={data.character.episode.length}
            />
            <div className="character-episode-items-container">
              {data.character.episode.length > 3 && (
                <div className="arrow-link">
                  <div className="arrow-link-item">
                    <button onClick={carouselInfiniteScroll}>
                      <RightArrow />
                    </button>
                  </div>
                </div>
              )}
              <div className="character-episode-items">
                {episodes.slice(0, 3)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CharacterDetail;
