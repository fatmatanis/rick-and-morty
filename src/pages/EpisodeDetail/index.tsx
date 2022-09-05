import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GetEpisode } from "../../queries/episodes";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ReactComponent as LeftArrow } from "../../assets/leftArrow.svg";
import { ReactComponent as RightArrow } from "../../assets/rightArrow.svg";
import FavoriteButton from "../../components/FavoriteButton";
import CharacterList from "../../components/CharacterList";
import TitleCount from "../../components/TitleCount";

const EpisodeDetail = () => {
  const [isShowMore, setIsShowMore] = useState(false);
  const location = useLocation();
  const episodeId = location.pathname.split("/").slice(2).toString();
  const { loading, error, data } = useQuery(GetEpisode, {
    variables: { id: episodeId }
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">Error :(</p>;

  const handleShow = () => {
    setIsShowMore(isShowMore => !isShowMore);
  };

  return (
    <>
      <div className="episode-detail-wrapper">
        <div className="episode-detail-container">
          <Link to={"/episodes"} className="episode-list-back">
            <LeftArrow className="episodes-arrow" />
            <span className="episode-list-back-text">Episode List</span>
          </Link>
          <div className="episode-list-next-back">
            <Link
              to={`/episodes/${parseInt(episodeId) - 1}`}
              className="episode-list-back"
            >
              <LeftArrow className="episodes-arrow" />
            </Link>
            <span className="episode-list-back-text">
              {data.episode.episode}
            </span>
            <Link
              to={`/episodes/${parseInt(episodeId) + 1}`}
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
              <FavoriteButton favStyle="green" />
            </div>
            <div className="episode-detail-date">
              <span className="episode-detail-aired">Aired:</span>
              <span className="episode-detail-air-date">
                {data.episode.air_date}
              </span>
            </div>
            <div className="episode-detail-description-container">
              <span className={`${isShowMore ? "showmore" : "showless"}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
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
            />
            <div className="home-character-list">
              <CharacterList
                characters={data.episode.characters}
                cardCount={4}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodeDetail;
