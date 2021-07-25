import { useState } from "react";
import { setQuery } from "../store/moviesReducer";
import { useDispatch } from "react-redux";

import { getMovies } from "../store/moviesReducer";

const useSearch = function () {
  const dispatch = useDispatch();
  const [value, setValue] = useState(JSON.parse(localStorage.getItem("query")) || "");

  // Get the movies from the API as the user types
  const handleQuery = (e) => {
    setValue(e.target.value);
    setQuery(value.toLowerCase());
    dispatch(setQuery(value));
  };

  // On enter it clears the input
  const search = (e) => {
    if (e.key === "Enter") {
      dispatch(getMovies(value.toLowerCase()));
      setValue("");
    }
  };

  return { value, handleQuery, search };
};

export default useSearch;
