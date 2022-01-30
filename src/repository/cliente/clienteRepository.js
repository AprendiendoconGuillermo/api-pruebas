const pool = require("../../database/mysql");

const guardar = async (req) => {
  const sql = "insert into cliente set ?";

  await pool.promise().query(sql, req.body);
};

const obtenerClientes = async () => {
  const sql = "select * from cliente";

  const [rows, fields] = await pool.promise().query(sql);
  return rows;
};

const obtenerCliente = async (req) => {
  const idCliente = req.params.idCliente;
  const sql = "select * from cliente where idCliente = ?";
  const [rows, fields] = await pool.promise().query(sql, idCliente);
  return rows;
};

const actualizarCliente = async (req) => {
  const { nombres, apellidos, correo, telefono, fecha_edicion, estado } =
    req.body;
  const idCliente = req.params.idCliente;
  const sql =
    "update cliente set nombres = ?, apellidos = ?, correo = ?, telefono = ?, fecha_edicion = ?, estado = ? where idcliente = ?";
  await pool
    .promise()
    .query(sql, [
      nombres,
      apellidos,
      correo,
      telefono,
      fecha_edicion,
      estado,
      idCliente,
    ]);
};

module.exports = { guardar, obtenerClientes, obtenerCliente, actualizarCliente };
