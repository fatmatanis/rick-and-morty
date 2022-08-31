import { gql } from "@apollo/client";

export const GetEpisode = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      airDate: air_date
      episode
      characters {
        id
        name
        image
        origin {
          name
        }
        species
        location {
          name
          dimension
          type
        }
      }
    }
  }
`;

export const GetAllEpisodes = gql`
  query GetAllEpisodes($page: Int!) {
    episodes(page: $page) {
      info {
        count
        pages
        next
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;
