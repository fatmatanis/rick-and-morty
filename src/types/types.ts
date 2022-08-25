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
  origin: string;
  species: string;
}

export interface INavigationProps {
  colorStyles: string;
}

interface ISelectedFilter {
  label: string;
  value: string;
  handleSelect: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ISelectprops {
  options: ISelectedFilter[];
  filtred: string;
}
