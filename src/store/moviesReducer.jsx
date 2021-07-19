import axios from "axios";
import { createAsyncThunk, createReducer, createAction } from "@reduxjs/toolkit";

const api = "http://www.omdbapi.com/?apikey=698d2b3c&";

const initialState = {
  currentMovie: JSON.parse(localStorage.getItem("currentMovie")) || {},
  searchedMovies: [],
  favoriteMovies: [],
};

export const clearMovies = createAction("CLEAR_MOVIES");

export const getMovies = createAsyncThunk("MOVIES", (query) => {
  return axios.get(`${api}s=${query}}`).then((res) => res.data);
});

export const getMovie = createAsyncThunk("MOVIE", (id) => {
  return axios.get(`${api}i=${id}`).then((res) => res.data);
});

export const getFavoriteMovies = createAsyncThunk("FAVORITE_MOVIES", (favoriteMovies) => {
  const moviePromises = [];
  console.log("favoriteMoviesId en reducer", favoriteMovies);
  for (let movieId in favoriteMovies) {
    const promise = axios.get(`${api}i=${movieId}`).then((res) => res.data);
    moviePromises.push(promise);
  }
  return Promise.all(moviePromises);
});

const moviesReducer = createReducer(initialState, {
  [clearMovies]: (state, action) => {
    state.searchedMovies = [];
    state.currentMovie = {};
    localStorage.removeItem("currentMovie");
  },
  [getMovies.fulfilled]: (state, action) => {
    state.searchedMovies = action.payload;
  },
  [getMovie.fulfilled]: (state, action) => {
    state.currentMovie = action.payload;
    localStorage.setItem("currentMovie", JSON.stringify(state.currentMovie));
  },
  [getFavoriteMovies.fulfilled]: (state, action) => {
    state.favoriteMovies = action.payload;
  },
});

export default moviesReducer;
