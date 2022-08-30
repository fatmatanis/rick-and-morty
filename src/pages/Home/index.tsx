import React from "react";

import { useQuery } from "@apollo/client";
import { GetAllCharacters } from "../../queries/characters";
import LoadingSpinner from "../../components/LoadingSpinner";
import TitleCount from "../../components/TitleCount";
import CharacterList from "../../components/CharacterList";

const Home = () => {
  const { loading, error, data } = useQuery(GetAllCharacters);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">Error :(</p>;

  console.log(data);

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-characters">
          <TitleCount
            link="/characters"
            text="Characters"
            count={data.characters.info.count}
          />
          <div className="home-character-list">
            <CharacterList characters={data.characters.results} cardCount={8} />
          </div>
        </div>
        <div className="home-episodes">
          <TitleCount link="/episodes" text="Episodes" count={0} />
        </div>
      </div>
    </div>
  );
};

export default Home;
