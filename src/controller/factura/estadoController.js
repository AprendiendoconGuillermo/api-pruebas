const estadoService = require("../../service/factura/estadoService");
const exception = require("../../exception/exception");

const listar = (req, res) => {
  try {
      estadoService.listar(req, res);
  } catch (error) {
    exception.internalError("Problema inesperado");
  }
};

module.exports = { listar };
