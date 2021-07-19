const path = require("path");

const express = require("express");
var morgan = require("morgan");

const routes = require("./routes");
const db = require("./db");

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Request parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan("tiny"));

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  console.log("error message: ", message);
  if (!res.headerSent) return res.status(status).send(message);
  res.send(message);
});

const PORT = process.env.PORT || 3001;
db.sync({ force: false }).then(function () {
  console.log("Database & tables created!");
  app.listen(PORT, () => {
    console.log(`server is listening on port http://localhost:${PORT}`);
  });
});
