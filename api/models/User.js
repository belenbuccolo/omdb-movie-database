const { Sequelize, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../db");

const saltRounds = 5;

class User extends Model {}

User.init(
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: {
          args: true,
          msg: "Username can only contain letters",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Email not valid",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
    },
    favoriteMovies: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
  },
  {
    sequelize: db, // connection instance
    modelName: "users",
  }
);

User.addHook("beforeCreate", async function (user) {
  user.salt = await bcrypt.genSalt(saltRounds);
  user.password = await user.hashPassword(user.password);
});

User.prototype.hashPassword = async function (password) {
  return await bcrypt.hash(password, this.salt);
};

User.prototype.validatePassword = async function (password) {
  return this.password === (await this.hashPassword(password));
};

User.prototype.addFavoriteMovie = async function (movieId) {
  console.log("favoriteMovies", this.favoriteMovies);
  console.log("movieId in sequelize", movieId);
  return await User.update(
    {
      favoriteMovies: Sequelize.fn(
        "array_append",
        Sequelize.col("favoriteMovies"),
        movieId
      ),
    },
    { where: { id: this.id }, returning: true }
  );
};

module.exports = User;
