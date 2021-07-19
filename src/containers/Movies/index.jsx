// React
import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material-ui components
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Local
import s from "./style.module.css";
import SearchForm from "../../components/SearchForm";
import MovieDetail from "../../components/MovieDetail";
import MovieGrid from "../../components/MovieGrid";
import { getMovies, getMovie, getFavoriteMovies } from "../../store/moviesReducer";
import { addFavoriteMovie } from "../../store/usersReducer";

// Renderiza una pelicula individual, o una grilla de peliculas
const Movies = function () {
  const dispatch = useDispatch();

  const currentMovie = useSelector((state) => state.movies.currentMovie || {});
  const favoriteMoviesIds = useSelector((state) => state.users.favoriteMoviesIds);
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
  const movies = useSelector((state) => state.movies.searchedMovies.Search || []);

  // Guardar query en el state para hacer un formulario controlado
  const [query, setQuery] = useState(JSON.parse(localStorage.getItem("query")) || "");

  React.useEffect(() => {
    dispatch(getMovies(query.toLowerCase()));
    localStorage.setItem("query", JSON.stringify(query));
  }, [dispatch, query]);

  React.useEffect(() => {
    dispatch(getFavoriteMovies(favoriteMoviesIds));
  }, [dispatch, favoriteMoviesIds]);

  // Guardar el query en el state a medida que es tipeado
  const handleQuery = (e) => {
    const value = e.target.value;
    console.log(value);
    setQuery(value.toLowerCase());
  };

  const setMovie = (id) => {
    dispatch(getMovie(id));
  };

  // Agregar un movieId a favoritos
  const addToFavorites = (movieId) => {
    // TODO if (!isAuth)
    dispatch(addFavoriteMovie(movieId));
  };

  const isFavorite = (movieId) => {
    const isFav = favoriteMoviesIds.includes(movieId);
    return isFav;
  };

  return (
    <main>
      <Container className={s["body-container"]}>
        <div className={s.main_title} align="center">
          BROWSE MOVIES
        </div>
        <Link to="/movies">
          <SearchForm handleQuery={handleQuery} query={query} />
        </Link>
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
          <Route path="/movies/:id" render={() => <MovieDetail movie={currentMovie} />} />
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
