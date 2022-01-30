const exception = require("../../exception/exception");
const clienteRepository = require("../../repository/cliente/clienteRepository");

const guardarCliente = (req, res) => {
  try {
    req.body.fecha_creacion = new Date();
    clienteRepository
      .guardar(req)
      .then((doc) => {
        exception.success(res, `Cliente ${req.body.nombres} creado con éxtido`);
      })
      .catch((err) => {
        exception.badRequest(
          res,
          `No se pudo crear el usuario ${req.body.nombre}`
        );
      });
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};

const obtenerClientes = (req, res) => {
  try {
    clienteRepository
      .obtenerClientes()
      .then((doc) => {
        if (doc.length === 0)
          exception.notFound(res, "No hay clientes que mostrar");
        else exception.success(res, `Clientes encontrados: ${doc.length}`, doc);
      })
      .catch((err) => {
        exception.badRequest(res, "Error al obtener los clientes");
      });
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};

const obtenerCliente = (req, res) => {
  try {
    clienteRepository
      .obtenerCliente(req)
      .then((doc) => {
        if (doc.length > 0) exception.found(res, "Usuario encontrado", doc);
        else exception.notFound(res, "No existe el usuario");
      })
      .catch((err) => {
        exception.badRequest(res, "Error al buscar el usuario");
      });
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};

const actualizarCliente = async (req, res) => {
  try {
    req.body.fecha_edicion = new Date();

    clienteRepository
      .obtenerCliente(req)
      .then((doc) => {
        if (doc.length > 0) {
          clienteRepository
            .actualizarCliente(req)
            .then((doc) => {
              exception.success(res, `Cliente ${req.body.nombres} actualizado`);
            })
            .catch((err) => {
              console.log(err);
              exception.badRequest(res, "No se pudo actualizar al cliente");
            });
        } else exception.notFound(res, "No existe el usuario");
      })
      .catch((err) => {
        exception.badRequest(res, "Error al buscar el usuario");
      });
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};

module.exports = {
  guardarCliente,
  obtenerClientes,
  obtenerCliente,
  actualizarCliente,
};
