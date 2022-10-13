import { ICharacter, IEpisode } from "./types";

export interface IFavProps {
  children: React.ReactNode;
}

export interface IFavContextObj {
  charactersList: ICharacter[];
  episodesList: IEpisode[];
  addCharFavorites: (char: ICharacter) => void;
  addEpisodeFavorites: (episode: IEpisode) => void;
  deleteCharFavorites: (id: number) => void;
  deleteEpisodeFavorites: (id: number) => void;
}
