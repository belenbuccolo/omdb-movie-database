import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HeaderContainer from "../HeaderContainer";
import Movies from "../Movies";
import Users from "../Users";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

const App = function () {
  return (
    <React.Fragment>
      <HeaderContainer />
      <Switch>
        <Route path="/movies" component={Movies} />
        <Route path="/users" component={Users} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Redirect from="/" to="/movies" />
      </Switch>
    </React.Fragment>
  );
};

export default App;
