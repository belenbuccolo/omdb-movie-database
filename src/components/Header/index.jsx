// React
import React from "react";
import { Link } from "react-router-dom";

// Material-ui components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

// Material-ui Icons
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

// Local
import SearchForm from "../SearchForm";
import s from "./style.module.css";

const Header = function ({ isAuth, logout, handleQuery, query, getFavoriteMovies }) {
  return (
    <header>
      <AppBar component="nav" position="static" color="transparent">
        <Toolbar className={s.toolbar}>
          <Link to="/movies">
            <span className={s.text}>
              <img className={s.logo} src="/logo.png" alt="" />
            </span>
          </Link>
          <div className={s.items}>
            <div>
              <Link to="/movies">
                <SearchForm handleQuery={handleQuery} query={query} />
              </Link>
            </div>
            <div>
              {isAuth && (
                <div className={s.actions}>
                  <span className={s.text} onClick={logout}>
                    Log Out
                  </span>
                  <Link to="/movies/favorites">
                    <span className={s.text}>Favorites</span>
                  </Link>
                  {/* <FavoriteBorderIcon className={s.icon} /> */}
                </div>
              )}
              {!isAuth && (
                <div className={s.actions}>
                  <Link to="/users/login">
                    <span className={s.text}>Log In</span>
                  </Link>
                  <Link to="/users/register">
                    <span className={s.text}>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
