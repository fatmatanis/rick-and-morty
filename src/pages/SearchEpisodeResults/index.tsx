import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavSearch } from "../../queries/search";
import { FavoritesContext } from "../../store/favorites-contex";
import EpisodeCard from "../../components/EpisodeCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IEpisode } from "../../types/types";

const SearchEpisodeResults = () => {
  const [episode, setEpisode] = useState<JSX.Element[]>([]);
  const { episodesList, addEpisodeFavorites, deleteEpisodeFavorites } =
    useContext(FavoritesContext);
  const { search } = useParams();
  const { data, loading, error, fetchMore } = useQuery(NavSearch, {
    variables: {
      filterEpisode: { name: search },
      page: 1
    }
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
    if (data) {
      const episodeData = data.episodes.results.map((episode: IEpisode) => {
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
  }, [addEpisodeFavHandler, data, deleteEpisodeFavHandler, episodesList]);

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
    <>
      {data?.episodes?.results?.length > 0 ? (
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
      ) : (
        <div className="no-search-results">There is no search results.</div>
      )}
    </>
  );
};

export default SearchEpisodeResults;
