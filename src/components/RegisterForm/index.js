// React
import React from "react";
import { Link } from "react-router-dom";

// Material-ui components
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Local
import s from "./style.module.css";

const RegisterForm = function ({
  onSubmitRegister,
  handleRegister,
  user,
  message,
  isRegistered,
}) {
  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" className={s.title}>
        Sign up
      </Typography>
      <Typography className={s.message} align="center">
        {message}
      </Typography>
      {isRegistered && (
        <Link to="/users/login">
          <Typography align="center">Log In</Typography>
        </Link>
      )}
      {!isRegistered && (
        <form onSubmit={onSubmitRegister} className={s["sign-up-form"]}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={handleRegister}
                value={user.username || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleRegister}
                value={user.email || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleRegister}
                value={user.password || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <button className={s.button} type="submit">
                Submit
              </button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default RegisterForm;
