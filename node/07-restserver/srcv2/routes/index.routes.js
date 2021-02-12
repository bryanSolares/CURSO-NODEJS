const { Router } = require("express");
const router = Router();
const usuariosRoute = require("./user.routes");

router.get("/api", (req, res) => {
  res.send("Bienvenido API v2 2020");
});

router.use("/api/usuarios", usuariosRoute);

module.exports = router;
