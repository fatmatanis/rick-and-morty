import { gql } from "@apollo/client";

export const GetCharacter = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export const GetAllCharacters = gql`
  query GetAllCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        origin {
          name
        }
        species
        location {
          name
        }
      }
    }
  }
`;
