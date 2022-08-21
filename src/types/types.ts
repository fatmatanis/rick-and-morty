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

export interface ICharacterCardProps {
  id: number;
  image: string;
  name: string;
  origin: string;
  species: string;
}
