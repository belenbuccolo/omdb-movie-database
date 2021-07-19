// React
import React from "react";

// Material-ui components
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Local
import s from "./style.module.css";

const LoginForm = function ({ onSubmitLogin, handleLogin, user, message, isAuth }) {
  return (
    <Container maxWidth="xs" className={s.container}>
      <Typography component="h1" variant="h5" className={s.title}>
        Log in
      </Typography>
      <Typography className={s.message} align="center">
        {message}
      </Typography>
      {!isAuth && (
        <form className={s["sign-up-form"]} onSubmit={onSubmitLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Username or Email Address"
                name="email"
                value={user.email || ""}
                onChange={handleLogin}
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
                value={user.password || ""}
                onChange={handleLogin}
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

export default LoginForm;
