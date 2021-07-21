// React
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material-ui components
import Container from "@material-ui/core/Container";

// Local
import s from "./style.module.css";
import MovieDetail from "../../components/MovieDetail";
import MovieGrid from "../../components/MovieGrid";
import { getMovies, getMovie, getFavoriteMovies } from "../../store/moviesReducer";
import { addFavoriteMovie } from "../../store/usersReducer";

// Renderiza una pelicula individual, o una grilla de peliculas
const Movies = function () {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.users.isAuth);
  const currentMovie = useSelector((state) => state.movies.currentMovie || {});
  const favoriteMoviesIds = useSelector((state) => state.users.favoriteMoviesIds);
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
  const movies = useSelector((state) => state.movies.searchedMovies.Search || []);
  const query = useSelector((state) => state.movies.query);

  // Mensaje para avisar que se agrego o removio de favoritos
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    dispatch(getMovies(query.toLowerCase()));
    localStorage.setItem("query", JSON.stringify(query));
  }, [dispatch, query]);

  React.useEffect(() => {
    dispatch(getFavoriteMovies(favoriteMoviesIds));
  }, [dispatch, favoriteMoviesIds]);

  const setMovie = (id) => {
    dispatch(getMovie(id));
  };

  // Agregar un movieId a favoritos
  const addToFavorites = (movieId) => {
    if (!isAuth) {
      toggleMessage("You must be logged in!");
      setTimeout(() => toggleMessage(""), 1000);
    }
    if (isAuth) {
      if (!isFavorite(movieId)) {
        dispatch(addFavoriteMovie(movieId));
        toggleMessage("Added to favorites!");
        setTimeout(() => toggleMessage(""), 1000);
      }
    }
  };

  const toggleMessage = (message) => {
    setMessage(message);
    const element = document.getElementById("message");
    element.style.opacity = message.length ? 1 : 0;
  };

  const isFavorite = (movieId) => {
    const isFav = favoriteMoviesIds.includes(movieId);
    return isFav;
  };

  return (
    <main>
      <Container className={s["body-container"]}>
        <div>
          <div className={s.main_title} align="center">
            BROWSE MOVIES
          </div>
          <div className={s.subtitle}>
            Millions of movies and TV shows to discover. Explore now.
          </div>
        </div>
        <div id="message" className={s.message}>
          {message}
        </div>
      </Container>
      <Container className={s["body-container"]}>
        <Switch>
          <Route
            path="/movies/favorites"
            render={() => (
              <MovieGrid
                movies={favoriteMovies}
                setMovie={setMovie}
                addToFavorites={addToFavorites}
                isFavorite={isFavorite}
              />
            )}
          />
          <Route
            path="/movies/:id"
            render={() => (
              <MovieDetail
                movie={currentMovie}
                addToFavorites={addToFavorites}
                isFavorite={isFavorite}
                setMovie={setMovie}
              />
            )}
          />
          <Route
            path="/movies"
            render={() => (
              <MovieGrid
                movies={movies}
                setMovie={setMovie}
                addToFavorites={addToFavorites}
                isFavorite={isFavorite}
              />
            )}
          />
        </Switch>
      </Container>
    </main>
  );
};

export default Movies;
