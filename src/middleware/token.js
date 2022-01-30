require("dotenv").config({ path: "settings.env" });
const jwt = require("jsonwebtoken");
const exception = require("../exception/exception");

const key = process.env.SALT_TOKEN;
const encodeToken = (idusuario, nombres) => {
  try {
    const payload = {
      data: {
        id: idusuario,
        nombre: nombres,
      },
    };

    return jwt.sign(payload, key, {
      expiresIn: 3600, // 1 HORA,
    });
  } catch (error) {
    throw "Hubo un problema al crear la authorization";
  }
};

const decodeToken = (token) => {
  jwt.verify(token, key, function (err, decoded) {
    if (err) {
      console.log(err.message);
      switch (err.message) {
        case "jwt expired":
          throw "Sesión expirada";
        case "invalid token":
          throw "Token inválido";
        case "jwt malformed":
          throw "Token mal formado";
        case "invalid signature":
          throw "Token mala signatura";
        default:
          throw err.message;
      }
    }
  });
};

module.exports = { encodeToken, decodeToken };
