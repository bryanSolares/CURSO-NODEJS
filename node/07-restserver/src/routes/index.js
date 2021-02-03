const app = require("express")();
const usuarioR = require("./usuario");
const loginR = require("./login");

app.use("/", loginR);
app.use("/usuario", usuarioR);

module.exports = app;
