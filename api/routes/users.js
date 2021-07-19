const express = require("express");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const validator = require("validator");
const { Op } = require("sequelize");

const User = require("../models/User");
const { verifyToken } = require("./jwt");
const { secretKey } = require("./jwt");

const router = express.Router();

router.use("/", function (req, res, next) {
  console.log("entre al middleware");
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Authorization");
  next();
});

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Chequear que el formato del username, email y password sea correcto
    if (!validator.isAlpha(username)) {
      return next(
        createError(400, "Username can only contain alpha characters")
      );
    }
    if (!validator.isEmail(email)) {
      return next(createError(400, "Email format is invalid"));
    }
    // REVIEW "validator.isStrongPassword is not a function"
    // if (
    //   \!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1 })
    // ) {
    //   return next(
    //     createError(
    //       400,
    //       "Password must longer than 8 characters and contain at least 1 number"
    //     )
    //   );
    // }

    // Si el usuario o email existe tirar un error
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (user) return next(createError(400, "Username or email already in use"));

    // Si el usuario aun no existe, crear un nuevo y devolver un 201
    await User.create({
      username: username,
      email: email,
      password: password,
    });

    res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  console.log("req.body", req.body);
  const { usernameOrEmail, password } = req.body;

  try {
    // Buscar un usuario por username o email
    let user = null;
    if (validator.isEmail(usernameOrEmail)) {
      user = await User.findOne({ where: { email: usernameOrEmail } });
    }
    if (validator.isAlpha(usernameOrEmail)) {
      user = await User.findOne({ where: { username: usernameOrEmail } });
    }

    // Si el email o contraseña son incorrectos tirar un error
    if (!user) return next(createError(400, "Invalid username or email"));
    if (!(await user.validatePassword(password))) {
      return next(createError(401, "Invalid password"));
    }

    // Generar un nuevo token
    const token = jwt.sign({ id: user.id }, secretKey);
    res.status(200).json({ ...user, token: token, isAuth: true });
  } catch (err) {
    return next(err);
  }
});

router.post("/favorites", verifyToken, async (req, res, next) => {
  const { movieId } = req.body;
  try {
    const user = await User.findOne({ where: { id: req.user } });

    if (!user)
      return next(createError(500, "Something went wrong, user not found"));

    const movie = await user.addFavoriteMovie(movieId);
    res.status(201).json(movie);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
