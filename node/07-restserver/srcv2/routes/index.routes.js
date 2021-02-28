const { Router } = require("express");
const router = Router();
const usuariosRoute = require("./user.routes");
const authRoute = require("./auth.routes");
const categoryRoute = require("./category.routes");
const productRoute = require("./product.routes");
const searchRoute = require("./buscar.routes");

router.get("/api", (req, res) => {
  res.send("Bienvenido API v2 2020");
});

router.use("/api/auth", authRoute);
router.use("/api/usuarios", usuariosRoute);
router.use("/api/categories", categoryRoute);
router.use("/api/products", productRoute);
router.use("/api/search", searchRoute);

module.exports = router;
