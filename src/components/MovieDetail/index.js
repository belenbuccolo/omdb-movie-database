import React from "react";
import { Link } from "react-router-dom";

// Material-ui components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Local
import MovieCard from "../MovieCard";
import s from "./style.module.css";

const MovieDetail = function ({ movie, addToFavorites, isFavorite, setMovie }) {
  console.log(movie);
  console.log(movie.Poster);
  return (
    <Container>
      <Grid container item>
        <Grid item xs={6} md={1} className={s.card_container}></Grid>
        <Grid item xs={6} md={5} className={s.card_container}>
          <MovieCard
            id={movie.imdbID}
            title={movie.Title}
            type={movie.type}
            year={movie.Year}
            poster={movie.Poster}
            addToFavorites={addToFavorites}
            isFavorite={isFavorite}
            setMovie={setMovie}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <div className={s.movie_title}>{movie.Title}</div>
          <div className={s.movie_description}>{movie.Plot}</div>
          <div>
            <ul>
              <li className={s.info_li}>Genre: {movie.Genre}</li>
              <li className={s.info_li}>Director: {movie.Director}</li>
              <li className={s.info_li}>Cast: {movie.Actors}</li>
              <li className={s.info_li}>Country: {movie.Country}</li>
            </ul>
          </div>
          <div className={s.ratings}>
            <div className={s.ratings_title}>Ratings</div>
            <ul>
              {movie.Ratings &&
                movie.Ratings.map((rating) => {
                  return (
                    <li className={s.rating_li}>{`${rating.Source || ""}: ${
                      rating.Value || ""
                    }`}</li>
                  );
                })}
            </ul>
          </div>
          <Link to="/movies">
            <div className={s.button_wrapper}>
              <button className={s.button}>Go Back</button>
            </div>
          </Link>
        </Grid>
        <Grid item xs={6} md={1} className={s.card_container}></Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetail;
