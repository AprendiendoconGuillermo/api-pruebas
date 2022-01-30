const express = require("express");
const api = express.Router();
const { validate, ValidationError, Joi } = require("express-validation");
const authorization = require("../../middleware/middleware");
const facturaService = require("../../service/factura/facturaService");
const exception = require("../../exception/exception");

const validateFactura = {
  body: Joi.object({
    // idCliente: Joi.string()
    //   .regex(/[0-9]$/).message('El id del cliente debe ser un número')
    //   .required(),
    // nombre_vendedor: Joi.string().required(),
    // total: Joi.number().required(),
    // estado_factura_id: Joi.number().required(),
    codigo_cliente: Joi.string()
      .regex(/[0-9]$/)
      .message("El id del cliente debe ser un número")
      .required(),
    vendedor: Joi.string().required(),
    precio: Joi.number().required(),
    estado: Joi.number().required(),
  }),
};
const updateFactura = {
  body: Joi.object({
    estado_factura_id: Joi.number().required(),
  }),
};

// factura/post
api.post(
  "/post",
  authorization,
  validate(validateFactura),
  facturaService.crearFactura
);
// factura/getAll
api.get("/getAll", authorization, facturaService.listarFactura);
// factura/patch
api.patch(
  "/patchEstado/:idFactura",
  authorization,
  validate(updateFactura),
  facturaService.cambiarEstadoFactura
);

api.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    console.log(err.details.body[0]);
    return exception.badRequest(res, "Error", err.details.body[0].message);
  }
  console.log(err.details);

  return exception.internalError(res, "Error inesperaado");
});

module.exports = api;
