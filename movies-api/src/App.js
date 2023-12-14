import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async()=>{
  setIsLoading(true);
  setError(null);
  try{
    const response = await fetch('https://movies-api-969fd-default-rtdb.firebaseio.com/movies.json');

    if(!response.ok){
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    const loadedMovies = [];

    for(const key in data){
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate
      });
    }

    setMovies(loadedMovies);
  } catch(error){
    setError(error.message);
  }
  setIsLoading(false);
  }, []);

  useEffect(()=>{
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie){
    const response = await fetch('https://movies-api-969fd-default-rtdb.firebaseio.com/movies.json',{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = response.json();
    console.log(data);
  }
  async function deleteMovieHandler(movieId) {
    try {
      const response = await fetch(`https://movies-api-969fd-default-rtdb.firebaseio.com/movies/${movieId}.json`,{
          method: 'DELETE',
      }
      );
      if (!response.ok) {
        throw new Error('Could not delete the movie.');
      }
      fetchMoviesHandler();
    } catch (error) {
      console.error('Error deleting movie:', error.message);
    }
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler}/>}
        {!isLoading && movies.length===0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
