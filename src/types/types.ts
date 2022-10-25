export interface INavbarProps {
  className: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
}

export interface ICharacterDetailCardProps {
  title: string;
  text: string;
}

export interface ITitleCountProps {
  link: string;
  text: string;
  count: number;
  clickable: boolean;
}

export interface IEpisodeCardProps {
  id: number;
  season: string;
  date: string;
  title: string;
  description: string;
  favorited: boolean;
  toggleFavorites: ({ id, episode, air_date, name }: IEpisode) => void;
}

export interface IFavoriteButtonProps {
  favStyle: string;
  favorited: boolean;
  toggleFavorites: () => void;
}

export interface ILoadingSpinnerProps {
  loadingStyle: string;
}

export interface ICharacterCardProps {
  id: number;
  image: string;
  name: string;
  origin?: string;
  species: string;
}

export interface INavigationProps {
  colorStyles: string;
}

export interface ICharacterListProps {
  characters: ICharacter[];
  cardCount: number;
}

export interface ICharacter {
  id: number;
  image: string;
  name: string;
  type: string;
  status: string;
  gender: string;
  species: string;
  location: ILocation;
  origin: ILocation;
  episode?: IEpisode[];
}

export interface ILocation {
  name: string;
  residents?: ICharacter[];
  dimension: string;
  type: string;
}
export interface IEpisode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters?: ICharacter[];
}

export interface ICharacterDetail {
  title: string;
  text: string;
}

interface ISelectedFilter {
  label: string;
  value: string;
  handleSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ISelectprops {
  options: ISelectedFilter[];
  filtered: string;
}

export interface ILocationCardProps {
  name: string;
  type: string;
  dimension: string;
}

export interface IScalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
}

export interface IBaseData {
  __typename: string;
}

export interface IInfo {
  count: IScalars["Int"];
  next?: IScalars["Int"];
  pages?: IScalars["Int"];
  prev?: IScalars["Int"];
}

export interface IEpisodes extends IBaseData {
  info: IInfo;
  results: IEpisode[];
}

export interface ICharacters {
  __typename?: string;
  info: IInfo;
  results: ICharacter[];
}

export interface ISearchData {
  characters: ICharacters;
  episodes: IEpisodes;
}
