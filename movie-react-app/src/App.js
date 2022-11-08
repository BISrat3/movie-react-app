import { response } from "express";
import React,{useState} from "react";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([])

  function fetchMovieHandler(){
    fetch('https://swapi.dev/api/films/')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,

          }
        })
      })
  }

  return (
    <React.Fragment >
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={dummyMovies}/>
      </section>
    </React.Fragment>
  );
}

export default App;
