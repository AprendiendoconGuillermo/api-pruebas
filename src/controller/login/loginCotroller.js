const exception = require("../../exception/exception");
const loginService = require("../../service/login/loginService");

const login = (req, res) => {
  try {
    loginService.login(req, res);
  } catch (error) {
    exception.internalError(res, "Error inesperado");
  }
};

module.exports = { login };
