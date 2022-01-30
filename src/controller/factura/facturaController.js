const exception = require("../../exception/exception");
const facturaService = require("../../service/factura/facturaService");

const crearFactura = (req, res) => {
  try {
    facturaService.crearFactura(req, res);
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};

const listarFactura = (req, res) =>{
  try {
    facturaService.crearFactura(req, res);
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
}
const cambiarEstadoFactura = (req, res) =>{
  try {
    facturaService.cambiarEstadoFactura(req, res);
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
}

module.exports = { crearFactura,listarFactura, cambiarEstadoFactura };
