// React
import React from "react";
import { Link } from "react-router-dom";

// Material-ui components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Material-ui Icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

// Local
import s from "./style.module.css";

const Header = function ({ isAuth, logout, getFavoriteMovies }) {
  return (
    <header>
      <AppBar component="nav" position="static" color="transparent">
        <Toolbar className={s.toolbar}>
          <Link to="/movies">
            <Button className={s.text}>Home</Button>
          </Link>
          <div>
            {isAuth && (
              <div className={s.actions}>
                <Button className={s.text} onClick={logout}>
                  Log Out
                </Button>
                <Link to="/movies/favorites">
                  <FavoriteBorderIcon className={s.icon} />
                </Link>
                {/* <AccountCircleIcon className={s.icon} /> */}
              </div>
            )}
            {!isAuth && (
              <div className={s.actions}>
                <Link to="/users/login">
                  <Button className={s.text}>Log In</Button>
                </Link>
                <Link to="/users/register">
                  <Button className={s.text}>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
