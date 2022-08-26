import React from "react";

import TitleCount from "../../components/TitleCount";

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-characters">
          <TitleCount link="/characters" text="Characters" count={0} />
        </div>
        <div className="home-episodes">
          <TitleCount link="/episodes" text="Episodes" count={0} />
        </div>
      </div>
    </div>
  );
};

export default Home;
