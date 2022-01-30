const bcrypt = require("bcryptjs");
const exception = require("../../exception/exception");
const usuarioRepository = require("../../repository/usuario/usuarioRepository");
const token = require("../../middleware/token");

const login = async (req, res) => {
  try {
    usuarioRepository
      .buscarUsuario(req)
      .then((doc) => {
        const {contrasena, idusuario, nombres} = doc;
           
        const password = bcrypt.compare(req.body.contrasena, contrasena);
        if (password) {
          const tok = token.encodeToken(idusuario, nombres);
          exception.success(res, "Login exitoso", {token: tok});
        } else exception.badRequest(res, "Contraseña incorrecta");
      })
      .catch((err) => {
        console.log(err);
        exception.badRequest(res, "Error al iniciar sesión", err);
      });
  } catch (error) {
    console.log(error);
    exception.internalError(res, "Error inesperado");
  }
};

module.exports = { login };
