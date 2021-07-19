const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const SECRET_KEY = "estodeberiaestarguardadoenotrolado";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(createError(400, "No token"));

  const encodedToken = authHeader.split(" ")[1];
  if (!encodedToken) return next(createError(401, "Unauthorized, no token"));

  jwt.verify(encodedToken, SECRET_KEY, (err, decodedToken) => {
    if (err) return next(createError(403, "Forbidden"));
    if (decodedToken) {
      req.user = decodedToken.id;
      return next();
    }
  });
};

module.exports = { verifyToken: verifyToken, secretKey: SECRET_KEY };
