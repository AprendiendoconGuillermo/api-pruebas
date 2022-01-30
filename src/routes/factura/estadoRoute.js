const express = require("express");
const api = express.Router();
const { validate, ValidationError, Joi } = require("express-validation");
const authorization = require("../../middleware/middleware");
const estadoController = require("../../controller/factura/estadoController");

//estado-factura/getAll
api.get("/getAll",authorization, estadoController.listar);

module.exports = api;
