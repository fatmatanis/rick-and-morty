import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GetEpisode } from "../../queries/episodes";
import { FavoritesContext } from "../../store/favorites-contex";
import LoadingSpinner from "../../components/LoadingSpinner";
import FavoriteButton from "../../components/FavoriteButton";
import CharacterList from "../../components/CharacterList";
import TitleCount from "../../components/TitleCount";
import LocationCard from "../../components/LocationCard";
import NotFound from "../NotFound";
import { ReactComponent as LeftArrow } from "../../assets/leftArrow.svg";
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg";
import { loremIpsumText } from "../../constants";
import { ICharacter, ILocation } from "../../types/types";

const EpisodeDetail = () => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [episodeLocation, setEpisodeLocation] = useState<ILocation[]>([]);
  const [locationArray, setLocationArray] = useState<JSX.Element[]>([]);
  const { addEpisodeFavorites, deleteEpisodeFavorites, episodesList } =
    useContext(FavoritesContext);
  const location = useLocation();
  const episodeId = location.pathname.split("/").slice(2).toString();
  const { loading, error, data } = useQuery(GetEpisode, {
    variables: { id: episodeId }
  });

  useEffect(() => {
    if (data?.episode === null) return;
    if (data) {
      const characterLocations = data.episode.characters.map(
        (item: ICharacter) => {
          return {
            name: item.location.name,
            dimension: item.location.dimension,
            type: item.location.type
          };
        }
      );

      setEpisodeLocation(characterLocations);
    }
  }, [data]);

  useEffect(() => {
    if (episodeLocation?.length > 0) {
      const uniqueLocations = Array.from(
        new Map<string, ILocation>(
          episodeLocation.map((i: ILocation) => [i["name"], i])
        ).values()
      )
        .filter(i => {
          return i.name !== "unknown";
        })
        .map(({ name, type, dimension }: ILocation, index) => {
          return (
            <div key={index} className="location-box">
              <LocationCard name={name} type={type} dimension={dimension} />
            </div>
          );
        });

      setLocationArray(uniqueLocations);
    }
  }, [episodeLocation]);

  const isFav =
    episodesList.length > 0 &&
    episodesList.some(episode => episode.id === data?.episode?.id);

  const addEpisodeFavHandler = () => {
    addEpisodeFavorites(data?.episode);
  };

  const deleteEpisodeFavHandler = () => {
    deleteEpisodeFavorites(data?.episode?.id);
  };

  if (loading) return <LoadingSpinner loadingStyle="arsenic" />;
  if (error) return <p className="error">Error :(</p>;
  if (data?.episode === null) return <NotFound />;

  const handleShow = () => {
    setIsShowMore(isShowMore => !isShowMore);
  };

  return (
    <>
      <div className="episode-detail-wrapper">
        <div className="episode-detail-container">
          <Link to="/episodes" className="episode-list-back">
            <LeftArrow className="episodes-arrow" />
            <span className="episode-list-back-text">Episode List</span>
          </Link>
          <div className="episode-list-next-back">
            {data.episode.id > 1 && (
              <Link
                to={`/episodes/${data.episode.id - 1}`}
                className="episode-list-back"
              >
                <LeftArrow className="episodes-arrow" />
              </Link>
            )}
            <span className="episode-list-back-text">
              {data.episode.episode}
            </span>
            <Link
              to={`/episodes/${parseInt(data.episode.id) + 1}`}
              className="episode-list-back"
            >
              <RightArrow className="episodes-arrow" />
            </Link>
          </div>
          <div className="episode-detail-content">
            <div className="episode-detail-title">
              <span className="episode-detail-name">{data.episode.name}</span>
              <span className="episode-detail-episode">
                {data.episode.episode}
              </span>
              <FavoriteButton
                favStyle="green"
                favorited={isFav}
                toggleFavorites={
                  !isFav ? addEpisodeFavHandler : deleteEpisodeFavHandler
                }
              />
            </div>
            <div className="episode-detail-date">
              <span className="episode-detail-aired">Aired:</span>
              <span className="episode-detail-air-date">
                {data.episode.air_date}
              </span>
            </div>
            <div className="episode-detail-description-container">
              <span className={`${isShowMore ? "showmore" : "showless"}`}>
                {loremIpsumText}
              </span>
              <button
                className="episode-detail-description-button"
                onClick={handleShow}
              >
                {isShowMore ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="episode-characters">
        <div className="home-container">
          <div className="home-characters">
            <TitleCount
              link={`/episodes/${episodeId}/characters`}
              text="Characters"
              count={data.episode.characters.length}
              clickable={true}
            />
            <div className="home-character-list">
              <CharacterList
                characters={data.episode.characters}
                cardCount={4}
              />
            </div>
          </div>
          <TitleCount
            link="#"
            text="Locations"
            count={locationArray.length}
            clickable={false}
          />
          <div className="episode-location-container">
            <div className="episode-locations-array">{locationArray}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodeDetail;
