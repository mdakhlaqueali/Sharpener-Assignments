import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MoviesList = (props) => {
  const handleDeleteMovie = (id) => {
    props.onDeleteMovie(id);
  };
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDeleteMovie={handleDeleteMovie}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
