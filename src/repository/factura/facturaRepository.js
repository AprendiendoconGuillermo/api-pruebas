const pool = require("../../database/mysql");

const crear = async (req) => {
  const sql = "insert into factura set ?";
  await pool.promise().query(sql, req.body);
};
const listar = async (req) => {
  const sql = "select * from factura";
  const [rows, fields] = await pool.promise().query(sql);
  if (rows.length > 0) return rows;
  else throw "No hay facturas que mostrar";
};

const actualizarEstado = async (req) => {
  const { estado_factura_id } = req.body;
  const idFactura = req.params.idFactura;
  const sql = "update factura set estado_factura_id = ? where idfactura = ?";
  const [rows] = await pool
    .promise()
    .query(sql, [estado_factura_id, idFactura]);

  if (rows.affectedRows < 1) throw "La factura no existe";
};

module.exports = { crear, listar, actualizarEstado };
