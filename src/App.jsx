import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SearchPage from "./pages/search/SearchPage";
import FavoritePage from "./pages/favorites/FavoritePages";
import MatchPage from "./pages/match/MatchPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/searches" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
