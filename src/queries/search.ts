import { gql } from "@apollo/client";

export const NavSearch = gql`
  query Characters(
    $filterCharacter: FilterCharacter
    $filterEpisode: FilterEpisode
    $page: Int
  ) {
    characters(filter: $filterCharacter, page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
        created
      }
    }
    episodes(filter: $filterEpisode, page: $page) {
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
