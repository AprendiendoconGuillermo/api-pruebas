const estadoRepository = require("../../repository/factura/estadoRepository");
const exception = require("../../exception/exception");

const listar = async (req, res) => {
  try {
    estadoRepository
      .listar()
      .then((doc) => {
          exception.success(res, `Estados listados: ${doc.fieldCount}`, doc)
      })
      .catch((err) => {
        console.log(err);
        exception.notFound(res,"Error al listar", err);
      });
  } catch (error) {
    console.log(error);

    exception.internalError(res,"Problema inesperado");
  }
};

module.exports = { listar };
