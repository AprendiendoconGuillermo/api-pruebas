const express = require("express");
const api = express();
const app = require("./src/app/app");
require("dotenv").config({ path: "settings.env" });

const PORT = process.env.PORT_API || 4000;
const CONTEXT = process.env.CONTEXT;

api.listen(PORT, () => {
  api.use(CONTEXT, app);
  console.log(`Server run in PORT: ${PORT}`);
});
