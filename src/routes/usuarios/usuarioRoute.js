const express = require("express");
const api = express.Router();
const { validate, ValidationError, Joi } = require("express-validation");
const usuarioController = require("../../controller/usuario/usuarioController");
const exception = require("../../exception/exception");
const authorization = require("../../middleware/middleware");

const createUpdateUser = {
  body: Joi.object({
    usuario: Joi.string().required(),
    nombres: Joi.string().required(),
    apellidos: Joi.string().required(),
    perfil_id: Joi.number().required(),
    contrasena: Joi.string()
      //   .regex(/[a-zA-Z0-9]{3,30}/)
      .regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      .required(),
  }),
};
// RUTAS
// usuario/post
api.post(
  "/post",  
  validate(createUpdateUser),
  usuarioController.insertarUsuarios
);
// usuario/getAll
api.get("/getAll", authorization,usuarioController.obtenerUsuarios);
// usuario/getById/:idUsuario
api.get("/getById/:idUsuario", authorization,usuarioController.obtenerUsuarioById);
// usuario/update/:idUsuario
api.put(
  "/update/:idUsuario",authorization,
  validate(createUpdateUser),
  usuarioController.actualizarUsuarios
);

// VALIDA LOS DATOS DE ENTRADA
api.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return exception.badRequest(res, "Error", err.details.body);
  }

  return exception.internalError(res, "Error inesperado", err.details.body);
});

module.exports = api;
