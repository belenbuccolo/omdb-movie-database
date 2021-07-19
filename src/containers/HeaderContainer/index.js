import React, { useSelector } from "react-redux";
import Header from "../../components/Header";

const HeaderContainer = function () {
  const isAuth = useSelector((state) => state.users.isAuth);

  const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    window.location.reload(); // REVIEW no deberia ser necesario recargar la pagina?
  };
  return <Header isAuth={isAuth} logout={logout} />;
};

export default HeaderContainer;
