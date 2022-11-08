import { response } from "express";
import React,{useEffect, useState, useCallback} from "react";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)



  // async function fetchMovieHandler(){
    const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
    // const response = await fetch('https://swapi.dev/api/films/')
    const response = await fetch ('https://react-moive-default-rtdb.firebaseio.com/movies.json')
    if (!response.ok){
      throw new Error('Something went wrong')
    }
    const data = await response.json()
      const loadedMoives = []

      for (const key in data){
        loadedMoives.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

        // const transformedMovies = data.results.map((movieData) => {
        // const transformedMovies = data.map((movieData) => {
         
        // return {
        //     id: movieData.episode_id,
        //     title: movieData.title,
        //     openingText: movieData.opening_crawl,
        //     releaseDate: movieData.release_date

        //   }
        // })
        // setMovies(transformedMovies)
        setMovies(loadedMoives)
      }
      catch (error) { 
        setError(error.message)
      }
      setIsLoading(false)
    }, [])

    useEffect(()=>{
      fetchMovieHandler()
    }, [fetchMovieHandler])
    
   async function addMovieHandler(movie){
      console.log(movie)
      const response = await fetch('https://react-moive-default-rtdb.firebaseio.com/movies.json', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data= await response.json()
      console.log(data)
    }

    let content = <p>Found no movies</p>

    if(movies.length >0){
      content = <MovieList movies={movies} />
    }
    if(movies.length === 0 ){
      content = <p>{error}</p>
    }
    if(isLoading){
      content =  <p>Loading.....</p>
    }
    

  return (
    <React.Fragment >
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovieHandler}> Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
