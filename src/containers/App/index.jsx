import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import HeaderContainer from "../HeaderContainer";
import Movies from "../Movies";
import Users from "../Users";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import theme from "./theme";

const App = function () {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <HeaderContainer />
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/users" component={Users} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Redirect from="/" to="/movies" />
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
