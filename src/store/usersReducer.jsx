import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: {},
  isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
  token: JSON.parse(localStorage.getItem("token")) || "",
  favoriteMoviesIds: [],
  error: "",
};

const axiosWithToken = axios.create({
  timeout: 1000,
  headers: { Authorization: `Bearer ${initialState.token}` },
});

export const registerUser = createAsyncThunk("REGISTER", (user, thunkAPI) => {
  return axios
    .post("/api/users/register", user)
    .then((res) => res.data)
    .catch((err) => thunkAPI.rejectWithValue(err.response.data)); // esto hace que se devuelva el error que viene de express en action.payload
});

export const logUser = createAsyncThunk("LOGIN", (user, thunkAPI) => {
  return axiosWithToken
    .post("/api/users/login", {
      usernameOrEmail: user.email,
      password: user.password,
    })
    .then((res) => res.data)
    .catch((err) => thunkAPI.rejectWithValue(err.response.data));
});

export const addFavoriteMovie = createAsyncThunk(
  "ADD_FAVORITE_MOVIE",
  (movieId, thunkAPI) => {
    return axiosWithToken
      .post("/api/users/favorites", { movieId: movieId })
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data));
  }
);

const usersReducer = createReducer(initialState, {
  [logUser.fulfilled]: (state, action) => {
    state.loggedUser = action.payload;

    state.isAuth = true;
    state.token = action.payload.token;

    localStorage.setItem("isAuth", JSON.stringify(action.payload.isAuth));
    localStorage.setItem("token", JSON.stringify(action.payload.token));
  },
  [logUser.rejected]: (state, action) => {
    state.error = action.payload;
  },
  [registerUser.fulfilled]: (state, action) => {
    state.error = action.payload;
  },
  [addFavoriteMovie.fulfilled]: (state, action) => {
    const user = action.payload[1]; // el update retorna un arr y el user viene el arr[1][0]
    const favoriteMovies = user[0].favoriteMovies;
    state.favoriteMoviesIds = favoriteMovies;
  },
});

export default usersReducer;
