const pool = require("../../database/mysql");
require("dotenv").config({ path: "settings.env" });
const bcrypt = require("bcryptjs");

const guardar = async (req) => {
  // ENCRIPTAR CONTRASEÑA
  const salt = bcrypt.genSaltSync(10);
  const password = await bcrypt.hash(req.body.contrasena, salt);
  req.body.contrasena = password;
  const sql = "insert into usuario set ?";

  await pool.promise().query(sql, req.body);
};

const buscarTodos = async () => {
  const sql = "select * from usuario";
  const [rows, fields] = await pool.promise().query(sql);
  return rows;
};

const buscarId = async (req) => {
  const sql = "select * from usuario where idUsuario = ?";
  const idUsuario = req.params.idUsuario;
  const [rows, fields] = await pool.promise().query(sql, idUsuario);
  return rows;
};

const actualizar = async (req) => {
  const idUsuario = req.params.idUsuario;
  const { usuario, contrasena, nombres, apellidos, perfil_id } = req.body;

  const sql =
    "update usuario set usuario = ?, contrasena = ?, nombres = ?, apellidos = ?, perfil_id = ? where idUsuario = ?";
  const [rows, fields] = await pool
    .promise()
    .query(sql, [
      usuario,
      contrasena,
      nombres,
      apellidos,
      perfil_id,
      idUsuario,
    ]);
};

// LOGIN
const buscarUsuario = async (req) => {
  const { usuario } = req.body;
  const sql = "select * from usuario where usuario = ?";
  const [rows, fiels] = await pool.promise().query(sql, usuario);
  if (rows.length > 0) return rows[0];
  else throw "No existe su usuario";
};
module.exports = { guardar, buscarTodos, buscarId, actualizar, buscarUsuario };
