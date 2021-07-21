import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuery } from "../../store/moviesReducer";
import Header from "../../components/Header";

const HeaderContainer = function () {
  const dispatch = useDispatch();

  const [value, setValue] = useState(JSON.parse(localStorage.getItem("query")) || "");
  const isAuth = useSelector((state) => state.users.isAuth);

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    window.location.reload(); // REVIEW
  };

  // Guardar el query en el state a medida que es tipeado
  const handleQuery = (e) => {
    setValue(e.target.value);
    setQuery(value.toLowerCase());
    dispatch(setQuery(value));
  };

  return (
    <Header isAuth={isAuth} logout={logout} query={value} handleQuery={handleQuery} />
  );
};

export default HeaderContainer;
