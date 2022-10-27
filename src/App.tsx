import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import CharacterDetail from "./pages/CharacterDetail";
import EpisodeDetail from "./pages/EpisodeDetail";
import EpisodeCharacters from "./pages/EpisodeCharacters";
import Home from "./pages/Home";
import CharacterEpisodes from "./pages/CharacterEpisodes";
import Characters from "./pages/Characters";
import SearchResults from "./pages/SearchResults";
import Episodes from "./pages/Episodes";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import SearchCharacterResults from "./pages/SearchCharacterResults";
import SearchEpisodeResults from "./pages/SearchEpisodeResults";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="episodes/:episodeId" element={<EpisodeDetail />} />
        <Route path="characters/:characterId" element={<CharacterDetail />} />
        <Route
          path="/episodes/:episodeId/characters"
          element={<EpisodeCharacters />}
        />
        <Route
          path="characters/:characterId/episodes"
          element={<CharacterEpisodes />}
        />
        <Route path="/characters" element={<Characters />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/search/characters" element={<SearchCharacterResults />} />
        <Route path="/search/episodes" element={<SearchEpisodeResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
