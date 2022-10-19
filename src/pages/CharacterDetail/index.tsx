import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg";
import { ICharacterDetail, IEpisode } from "../../types/types";

function CharacterDetail() {
  const [characterDetail, setCharacterDetail] = useState<ICharacterDetail[]>(
    []
  );
  const [array, setArray] = useState<JSX.Element[]>([]);
  const [episodes, setEpisodes] = React.useState<JSX.Element[]>([]);
  const { charactersList, addCharFavorites, deleteCharFavorites } =
    useContext(FavoritesContext);
  const location = useLocation();
  const pageUrlId = location.pathname.split("/").slice(2).toString();
  const { loading, error, data } = useQuery(GetCharacter, {
    variables: { id: pageUrlId }
  });

  useEffect(() => {
    if (data) {
      setCharacterDetail([
        { title: "Status", text: data.character.status },
        { title: "Gender", text: data.character.gender },
        { title: "Species", text: data.character.species },
        { title: "Origin", text: data.character.origin.name },
        {
          title: "Type",
          text: data.character.type === "" ? "Unknown" : data.character.type
        },
        { title: "Location", text: data.character.location.name }
      ]);
    }
  }, [data]);

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

  useEffect(() => {
    if (data) {
      setEpisodes(
        data.character.episode.slice(0, 3).map((episode: IEpisode) => {
          return (
            <div className="character-episode-list" key={episode.id}>
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
  }, [data]);

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
              link={`/characters/${pageUrlId}/episodes`}
              text="Episodes"
              count={data.character.episode.length}
            />
            <div className="character-episode-items-container">
              <div className="arrow-link">
                <div className="arrow-link-item">
                  <Link to={`/characters/${pageUrlId}/episodes`}>
                    <RightArrow />
                  </Link>
                </div>
              </div>
              <div className="character-episode-items">{episodes}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CharacterDetail;
