const app = require("express")();
const usuarioR = require("./usuario");

app.use("/usuario", usuarioR);

module.exports = app;
