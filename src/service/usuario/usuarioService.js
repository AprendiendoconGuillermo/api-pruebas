const exception = require("../../exception/exception");
const usuarioRepository = require("../../repository/usuario/usuarioRepository");
const perfilRepository = require("../../repository/perfil/perfilRepository");

function insertarUsuario(req, res) {
  const { perfil_id } = req.body;
  try {
    perfilRepository
      .buscarPerfil(perfil_id)
      .then((doc) => {
        if (doc) {
          usuarioRepository
            .guardar(req)
            .then((doc) => {
              exception.success(
                res,
                `Usuario ${req.body.usuario} creado con éxito`
              );
            })
            .catch((err) => {
              console.log(err);
              exception.badRequest(
                res,
                `No se pudo crear al usuario ${req.body.usuario}`
              );
            });
        } else exception.badRequest(res, "El perfil del usuario no existe");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
}
const obtenerUsuarios = (res) => {
  try {
    usuarioRepository
      .buscarTodos()
      .then((doc) => {
        exception.success(res, `Usuarios encontrados: ${doc.length}`, doc);
      })
      .catch((err) => {
        exception.notFound(res, "No hay usuarios creados");
      });
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
};
function obtenerUsuarioById(req, res) {
  try {
    usuarioRepository
      .buscarId(req)
      .then((doc) => {
        if (doc.length > 0)
          exception.success(res, `Usuario encontrado: ${doc.length}`, doc);
        else exception.notFound(res, "No se encontró el usuario");
      })
      .catch((err) => {
        console.log(err);
        exception.badRequest(res, "Problema al buscar el usuario");
      });
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
}
function actualizarUsuario(req, res) {
  try {
    usuarioRepository
      .buscarId(req)
      .then((doc) => {
        if (doc.length > 0) {
          usuarioRepository
            .actualizar(req)
            .then((doc) => {
              exception.success(res, "Usuario actualizado");
            })
            .catch((err) => {
              exception.badRequest(res, "No se pudo actualizar usuario");
            });
        } else exception.notFound(res, "No se encontró el usuario");
      })
      .catch((err) => {
        exception.badRequest(res, "Problema al buscar el usuario");
      });
  } catch (error) {
    exception.internalError(res, "Problema inesperado");
  }
}

module.exports = {
  insertarUsuario,
  obtenerUsuarios,
  obtenerUsuarioById,
  actualizarUsuario,
};
