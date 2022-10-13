import React, { useEffect, useState } from "react";
import { ICharacter, IEpisode } from "../types/types";

interface IFavProps {
  children: React.ReactNode;
}

interface IFavContextObj {
  charactersList: ICharacter[];
  episodesList: IEpisode[];
  addCharFavorites: (char: ICharacter) => void;
  addEpisodeFavorites: (episode: IEpisode) => void;
  deleteCharFavorites: (id: number) => void;
  deleteEpisodeFavorites: (id: number) => void;
}

export const FavoritesContext = React.createContext<IFavContextObj>({
  charactersList: [],
  episodesList: [],
  addCharFavorites: () => null,
  addEpisodeFavorites: () => null,
  deleteCharFavorites: () => null,
  deleteEpisodeFavorites: () => null
});

export const FavoritesContextProvider = ({ children }: IFavProps) => {
  const [charactersList, setCharactersList] = useState<ICharacter[]>([]);
  const [episodesList, setEpisodesList] = useState<IEpisode[]>([]);

  useEffect(() => {
    const favChars = JSON.parse(localStorage.getItem("characters") || "[]");
    setCharactersList(favChars);
  }, []);

  const saveFavChar = (char: ICharacter[]) => {
    localStorage.setItem("characters", JSON.stringify(char));
  };

  useEffect(() => {
    const favEpisodes = JSON.parse(localStorage.getItem("episodes") || "[]");
    setEpisodesList(favEpisodes);
  }, []);

  const saveFavEpisode = (episode: IEpisode[]) => {
    localStorage.setItem("episodes", JSON.stringify(episode));
  };

  const addCharFavorites = (char: ICharacter) => {
    const newCharsFavList = [...charactersList, char];
    setCharactersList(newCharsFavList);
    saveFavChar(newCharsFavList);
  };

  const addEpisodeFavorites = (episode: IEpisode) => {
    const newEpisodesFavList = [...episodesList, episode];
    setEpisodesList(newEpisodesFavList);
    saveFavEpisode(newEpisodesFavList);
  };

  const deleteCharFavorites = (id: number) => {
    const updatedCharsList = [
      ...charactersList.filter(found => found.id !== id)
    ];
    setCharactersList(updatedCharsList);
    saveFavChar(updatedCharsList);
  };

  const deleteEpisodeFavorites = (id: number) => {
    const updatedEpisodesList = [
      ...episodesList.filter(found => found.id !== id)
    ];
    setEpisodesList(updatedEpisodesList);
    saveFavEpisode(updatedEpisodesList);
  };

  return (
    <FavoritesContext.Provider
      value={{
        charactersList: charactersList,
        episodesList: episodesList,
        addCharFavorites: addCharFavorites,
        addEpisodeFavorites: addEpisodeFavorites,
        deleteCharFavorites: deleteCharFavorites,
        deleteEpisodeFavorites: deleteEpisodeFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
