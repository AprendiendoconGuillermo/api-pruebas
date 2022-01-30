const pool = require("../../database/mysql");

const buscarPerfil = async (req) => {
  const sql = "select * from perfil where idperfil = ?";

  const [rows, fields] = await pool.promise().query(sql, req);
  return rows[0];
};

module.exports = { buscarPerfil };
