import React from "react";

// Material-ui components
import Grid from "@material-ui/core/Grid";

// Local
import MovieCard from "../MovieCard";

const MovieGrid = function ({ movies, setMovie, addToFavorites, isFavorite }) {
  console.log("MOVIES", movies);
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.imdbID}
            id={movie.imdbID}
            title={movie.Title}
            type={movie.type}
            year={movie.Year}
            poster={movie.Poster}
            setMovie={setMovie}
            addToFavorites={addToFavorites}
            isFavorite={isFavorite}
          />
        );
      })}
    </Grid>
  );
};

export default MovieGrid;
