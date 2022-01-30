const exception = require("../../exception/exception");
const facturaRepository = require("../../repository/factura/facturaRepository");
const estadoFacturaRepository = require("../../repository/factura/estadoRepository");
const factorizar = require("../../models/factura/facturaModel");

const crearFactura = async (req, res) => {
  try {
    // factorizo los datos antes de guardar
    req.body = factorizar.factorizar(req);
    estadoFacturaRepository
      .estadoFactura(req)
      .then((doc) => {
        facturaRepository
          .crear(req)
          .then((doc) => {
            exception.success(res, "Factura creada");
          })
          .catch((err) => {
            console.log(err);
            exception.badRequest(res, "No se pudo crear la factura");
          });
      })
      .catch((err) => {
        console.log(err);
        exception.badRequest(res, "No se pudo crear la factura", err);
      });
  } catch (error) {
    console.log(error);
    exception.internalError(res, "Problema inesperado");
  }
};

const listarFactura = async (req, res) => {
  try {
    facturaRepository
      .listar(req)
      .then((doc) => {
        doc = factorizar.desFactorizar(doc);
        exception.success(res, `Facturas listadas: ${doc.length}`, doc);
      })
      .catch((err) => {
        console.log(err);
        exception.badRequest(res, "No se pudo listar las facturas");
      });
  } catch (error) {
    console.log(error);
    exception.internalError(res, "Problema inesperado");
  }
};

const cambiarEstadoFactura = async (req, res) => {
  try {
    estadoFacturaRepository
      .estadoFactura(req)
      .then((doc) => {
        facturaRepository
          .actualizarEstado(req)
          .then((doc) => {
            exception.success(res, "Factura actualizada");
          })
          .catch((err) => {
            console.log(err);
            exception.badRequest(res, "No se pudo actualizar la factura", err);
          });
      })
      .catch((err) => {
        console.log(err);
        exception.badRequest(res, "No se pudo actualizar la factura", err);
      });
  } catch (error) {
    console.log(error);
    exception.internalError(res, "Problema inesperado");
  }
};
module.exports = { crearFactura, listarFactura, cambiarEstadoFactura };
