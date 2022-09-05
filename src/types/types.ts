export interface INavbarProps {
  className: string;
}

export interface ICharacterDetailCardProps {
  title: string;
  text: string;
}

export interface ITitleCountProps {
  link: string;
  text: string;
  count: number;
}

export interface IEpisodeCardProps {
  id: number;
  season: string;
  date: string;
  title: string;
  description: string;
}

export interface IFavoriteButtonProps {
  favStyle: string;
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
  location?: ILocation;
  origin: ILocation;
  episode?: IEpisode[];
}

export interface ILocation {
  id?: number;
  name?: string;
  residents?: ICharacter[];
  dimension?: string;
  type?: string;
}
export interface IEpisode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
  characters: ICharacter[];
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
