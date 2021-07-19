// React
import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Material-ui component
import Container from "@material-ui/core/Container";

// Local
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import { registerUser, logUser } from "../../store/usersReducer";

// Renderiza los formularios de login y register
const Users = function () {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.users.isAuth);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  // Limpiar el mensaje cuando cambia la ruta
  const { pathname } = useLocation();
  useEffect(() => {
    setMessage("");
  }, [pathname]);

  const clearUser = () => {
    setUser({ username: "", email: "", password: "" });
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(user)).then((action) => {
      if (action.error) return setMessage(action.payload);
      setMessage("You are now registered!");
      setIsRegistered(true);
      clearUser();
    });
  };

  // REVIEW como hago para chequear si el email existe sin hacer submit?
  const handleRegister = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value.toLowerCase();
    setUser({ ...user, [fieldName]: value });
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(logUser(user)).then((action) => {
      if (action.error) return setMessage(action.payload);
      setMessage("You are now logged in!");
      clearUser();
    });
  };

  const handleLogin = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value.toLowerCase();
    setUser({ ...user, [fieldName]: value });
  };

  return (
    <Container>
      <Switch>
        <Route
          path="/users/login"
          render={() => (
            <LoginForm
              onSubmitLogin={onSubmitLogin}
              handleLogin={handleLogin}
              user={user}
              message={message}
              isAuth={isAuth}
            />
          )}
        />
        <Route
          path="/users/register"
          render={() => (
            <RegisterForm
              onSubmitRegister={onSubmitRegister}
              handleRegister={handleRegister}
              user={user}
              message={message}
              isRegistered={isRegistered}
            />
          )}
        />
      </Switch>
    </Container>
  );
};

export default Users;
