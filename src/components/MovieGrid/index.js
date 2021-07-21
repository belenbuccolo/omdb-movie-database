import React from "react";

// Material-ui components
import Grid from "@material-ui/core/Grid";

// Local
import MovieCard from "../MovieCard";
import s from "./style.module.css";

const MovieGrid = function ({ movies, setMovie, addToFavorites, isFavorite }) {
  console.log("MOVIES", movies);
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => {
        return (
          <Grid item xs={6} md={3} className={s.movie_card_container}>
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              id={movie.imdbID}
              title={movie.Title}
              type={movie.type}
              year={movie.Year}
              poster={movie.Poster}
              setMovie={setMovie}
              addToFavorites={addToFavorites}
              isFavorite={isFavorite}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MovieGrid;
