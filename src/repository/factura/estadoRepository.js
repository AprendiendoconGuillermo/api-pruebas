const pool = require("../../database/mysql");

const listar = async () => {
  const sql = "select * from estado_factura";
  const [rows, fields] = await pool.promise().query(sql);
  if (rows.length < 1) {
    throw "No hay estado de factura que mostrar";
  } else {
    return rows;
  }
};

const estadoFactura = async (req) => {
  const { estado_factura_id } = req.body;
  const sql = "select * from estado_factura where idestado_factura = ?";
  const [rows, fields] = await pool.promise().query(sql, estado_factura_id);
  if (rows.length < 1) {
    throw "El estado de la factura no existe";
  } else {
    return rows[0];
  }
};

module.exports = { estadoFactura,listar };
