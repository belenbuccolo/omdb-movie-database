const { Sequelize } = require("sequelize");

// Connecting to database
const db = new Sequelize("postgres://postgres@localhost:5432/omdb", {
  dialect: "postgres",
  logging: false,
});

// Testing the connection
(async () => {
  try {
    await db.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;
