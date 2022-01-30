const { validate, ValidationError, Joi } = require("express-validation");
const express = require("express");
const api = express.Router();
const exception = require("../../exception/exception");
const loginCotroller = require("../../controller/login/loginCotroller");

// VALIDATE LOGIN
const loginValidation = {
  body: Joi.object({
    usuario: Joi.string().required(),
    contrasena: Joi.string().required(),
  }),
};

// ROUTE
// login
api.post("/", validate(loginValidation), loginCotroller.login);

api.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return exception.badRequest(res, "Error", err.details.body);
  }
  console.log(err.details);

  return exception.internalError(res, "Error inesperaado");
});

module.exports = api;