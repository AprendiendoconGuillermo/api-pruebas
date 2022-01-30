const exception = require("../../exception/exception.js");
const usuarioService = require("../../service/usuario/usuarioService");

function insertarUsuarios(req, res) {
  try {
    usuarioService.insertarUsuario(req, res);
  } catch (error) {
    exception.internalError(res, "Problema Inesperado");
  }
}
function obtenerUsuarios(req, res) {
  try {
    usuarioService.obtenerUsuarios(res);
  } catch (error) {
    exception.internalError(res, "Problema Inesperado");
  }
}
function obtenerUsuarioById(req, res) {
  try {
    usuarioService.obtenerUsuarioById(req, res);
  } catch (error) {
    exception.internalError(res, "Problema Inesperado");
  }
}
function actualizarUsuarios(req, res) {
  try {
    usuarioService.actualizarUsuario(req, res);
  } catch (error) {
    exception.internalError(res, "Problema Inesperado");
  }
}

module.exports = {
  insertarUsuarios,
  obtenerUsuarios,
  obtenerUsuarioById,
  actualizarUsuarios,
};
