const exception = require("../exception/exception");
const token = require("../middleware/token");

const authorization = (req, res, next) => {
  try {
    // verificamos si hay token
    if (req.headers.authorization) {
      token.decodeToken(req.headers.authorization);
      next();
    } else {
      return exception.unauthorized(
        res,
        "No puede acceder al recurso solicitado"
      );
    }
  } catch (error) {
    return exception.unauthorized(res, "Token", error);
  }
};

module.exports = authorization;
