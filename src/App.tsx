import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import CharacterDetail from "./pages/CharacterDetail";
import EpisodeDetail from "./pages/EpisodeDetail";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="episodes/:episodeId" element={<EpisodeDetail />} />
=======
        <Route path="characters/:characterId" element={<CharacterDetail />} />
>>>>>>> main
      </Routes>
    </BrowserRouter>
  );
}

export default App;
