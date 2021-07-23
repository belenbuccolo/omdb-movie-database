import React from "react";
import { useSelector } from "react-redux";

import useSearch from "../../hooks/useSearch";
import Header from "../../components/Header";

const HeaderContainer = function () {
  const isAuth = useSelector((state) => state.users.isAuth);
  const { value, handleQuery, search } = useSearch();

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    window.location.reload(); // REVIEW
  };

  return (
    <Header
      isAuth={isAuth}
      logout={logout}
      query={value}
      handleQuery={handleQuery}
      search={search}
    />
  );
};

export default HeaderContainer;
