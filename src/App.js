import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

// Old code
// const API_KEY = "323fa790ac15ae52e9e347c7080c12f1";
// const requests = {
//   fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
//   fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
//   fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
//   fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
//   fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
//   fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
//   fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
//   fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
//   fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
// };

// New Code
const API_KEY = process.env.REACT_APP_API_KEY;
const USER_ID = process.env.REACT_APP_USER_ID;
// const API_KEY = "RYoOcWM4JW";
// const USER_ID = "User 02";
console.log("USER_ID: ", USER_ID);
const requests = {
  fetchGenreList: `/api/movies/genre/all/?token=${API_KEY}&userId=${USER_ID}`,
  fetchLanguageList: `/api/movies/language/all/?token=${API_KEY}&userId=${USER_ID}`,
  fetchMediaTypeList: `/api/movies/media-type-list/all/?token=${API_KEY}&userId=${USER_ID}`,
  fetchTrending: `/api/movies/trending?token=${API_KEY}&userId=${USER_ID}`,
  fetchNetflixOriginals: `/api/movies/discover/?token=${API_KEY}&userId=${USER_ID}&genre=10770`,
  fetchTopRated: `/api/movies/top-rate?token=${API_KEY}&userId=${USER_ID}`,
  fetchActionMovies: `/api/movies/discover/?token=${API_KEY}&userId=${USER_ID}&genre=28`,
  fetchComedyMovies: `/api/movies/discover/?token=${API_KEY}&userId=${USER_ID}&genre=35`,
  fetchHorrorMovies: `/api/movies/discover/?token=${API_KEY}&userId=${USER_ID}&genre=27`,
  fetchRomanceMovies: `/api/movies/discover/?token=${API_KEY}&userId=${USER_ID}&genre=10749`,
  fetchDocumentaries: `/api/movies/discover/?token=${API_KEY}&userId=${USER_ID}&genre=99`,
  fetchSearch: `/api/movies/search/?token=${API_KEY}&userId=${USER_ID}`,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Browse requests={requests} apiKey={API_KEY} userId={USER_ID} />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              fetchSearch={requests.fetchSearch}
              fetchGenreList={requests.fetchGenreList}
              fetchLanguageList={requests.fetchLanguageList}
              fetchMediaTypeList={requests.fetchMediaTypeList}
              apiKey={API_KEY}
              userId={USER_ID}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
