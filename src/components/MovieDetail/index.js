import React from "react";

// Material-ui components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Local
import s from "./style.module.css";

// TODO hacer que cuando se recargue la pagina no se pierdan los detalles

const MovieDetail = function ({ movie }) {
  console.log(movie);
  console.log(movie.Poster);
  return (
    <Container className={s["move-detail-container"]}>
      <Typography variant="h5" className={s.title}>
        {`${movie.Title} (${movie.Year})`}
      </Typography>
      <Grid container item>
        <Grid item xs={12} md={6}>
          <img src={movie.Poster} className={s.poster} alt="poster"></img>
          {/* <div className={s.ratings}>
            {movie.Ratings.map((rating) => {
              return <p>{`${rating.source}: ${rating.value}`}</p>;
            })}
          </div> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <p>Genre: {movie.Genre}</p>
          <p>Director: {movie.Director}</p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetail;
