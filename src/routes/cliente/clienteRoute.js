const express = require("express");
const api = express.Router();
const { validate, ValidationError, Joi } = require("express-validation");
const clienteController = require("../../controller/cliente/clienteController");
const exception = require("../../exception/exception");
const authorization = require("../../middleware/middleware");

// VALIDATE CLIENTE/POST
const createUpdateClienteValidation = {
  body: Joi.object({
    nombres: Joi.string().required(),
    apellidos: Joi.string().required(),
    correo: Joi.string().email().required(),
    telefono: Joi.string().min(2).required(),
    estado: Joi.number().required(),
  }),
};

// ROUTE
// cliente/post
api.post(
  "/post",
  authorization,
  validate(createUpdateClienteValidation),
  clienteController.insertarUsuario
);
// cliente/getAll
api.get("/getAll", authorization, clienteController.obtenerClientes);
// cliente/getById/:idCliente
api.get("/getById/:idCliente", authorization, clienteController.obtenerCliente);
// cliente/update/:idCliente
api.put(
  "/update/:idCliente",
  authorization,
  validate(createUpdateClienteValidation),
  clienteController.actualizarCliente
);
// VALIDA LOS DATOS DE ENTRADA
api.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return exception.badRequest(res, "Error", err.details.body);
  }
  console.log(err.details);
  return exception.internalError(res, "Error inesperado");
});

module.exports = api;
