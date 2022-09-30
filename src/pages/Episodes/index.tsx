import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetAllEpisodes } from "../../queries/episodes";
import EpisodeCard from "../../components/EpisodeCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IEpisode } from "../../types/types";

const Episodes = () => {
  const [episode, setEpisode] = useState<JSX.Element[]>([]);
  const { loading, error, data, fetchMore } = useQuery(GetAllEpisodes, {
    variables: { page: 1 }
  });

  useEffect(() => {
    if (data) {
      const episodeData = data.episodes.results.map((episode: IEpisode) => {
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
      setEpisode(episodeData);
    }
  }, [data]);

  const nextPage = data?.episodes?.info?.next;

  const loadMore = () => {
    fetchMore({
      variables: { page: nextPage },
      updateQuery: (prevResults, { fetchMoreResult }) => {
        fetchMoreResult.episodes.results = [
          ...prevResults.episodes.results,
          ...fetchMoreResult.episodes.results
        ];
        return fetchMoreResult;
      }
    });
  };

  if (loading) return <LoadingSpinner loadingStyle="arsenic" />;
  if (error) return <p className="error">Error :(</p>;

  return (
    <div className="episodes-wrapper">
      <div className="episodes-container">
        <div className="title-count-container">
          <span className="title-count-text">Episodes</span>
          <div className="title-count-number">
            {data?.episodes?.info?.count}
          </div>
        </div>
        <div>
          <InfiniteScroll
            next={loadMore}
            hasMore={nextPage !== null}
            loader={<LoadingSpinner loadingStyle="transparent" />}
            dataLength={data?.episodes?.results?.length}
          >
            <div className="home-episode-list">{episode}</div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
