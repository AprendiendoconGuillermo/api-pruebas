const exception = require("../../exception/exception");
const clienteService = require("../../service/cliente/clienteService");

const insertarUsuario = (req, res) => {
  try {
    clienteService.guardarCliente(req, res);
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};

const obtenerClientes = (req, res) => {
  try {
    clienteService.obtenerClientes(req, res);
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};

const obtenerCliente = (req, res) => {
  try {
    clienteService.obtenerCliente(req, res);
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};

const actualizarCliente = (req, res) => {
  try {
    clienteService.actualizarCliente(req, res);
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};

module.exports = {
  insertarUsuario,
  obtenerClientes,
  obtenerCliente,
  actualizarCliente,
};
