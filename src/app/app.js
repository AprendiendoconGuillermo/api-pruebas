const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const usuarioRoute = require("../routes/usuarios/usuarioRoute");
const clienteRoute = require("../routes/cliente/clienteRoute");
const loginRoute = require("../routes/login/loginRoute");
const facturaRoute = require("../routes/factura/facturaRoute");
const estadoFacturaRoute = require("../routes/factura/estadoRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/usuario", usuarioRoute);
app.use("/cliente", clienteRoute);
app.use("/login", loginRoute);
app.use("/factura", facturaRoute);
app.use("/estado-factura", estadoFacturaRoute);

module.exports = app;
