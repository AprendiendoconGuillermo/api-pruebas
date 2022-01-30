const _ = require("lodash");

const factorizar = (req) => {
  const body = {};
  _.forEach(req.body, function (value, key) {
    switch (key) {
      case "codigo_cliente":
        _.assign(body, { idCliente: value });
        break;
      case "vendedor":
        _.assign(body, { nombre_vendedor: value });
        break;
      case "precio":
        _.assign(body, { total: value });
        break;
      case "estado":
        _.assign(body, { estado_factura_id: value });
        break;
    }
  });

  return body;
};

const desFactorizar = (row) => {
  const response = [];
  _.forEach(row, function (value, key) {
    const data = {};
    _.forEach(value, function (value, key) {
      switch (key) {
        case "idfactura":
          _.assign(data, { codigo_factura: value });
          break;
        case "nombre_vendedor":
          _.assign(data, { vendedor: value });
          break;
        case "total":
          _.assign(data, { precio: value });
          break;
        case "estado_factura_id":
          _.assign(data, { estado: value });
          break;
        case "idCliente":
          _.assign(data, { codigo_cliente: value });
          break;
      }
    });
    response.push(data);
  });
   return response;
};
module.exports = { factorizar, desFactorizar };
