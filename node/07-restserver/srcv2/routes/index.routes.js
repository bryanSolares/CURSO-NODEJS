const { Router } = require("express");
const router = Router();
const usuariosRoute = require("./user.routes");
const authRoute = require("./auth.routes");
const categoryRoute = require("./category.routes");
const productRoute = require('./product.routes')

router.get("/api", (req, res) => {
  res.send("Bienvenido API v2 2020");
});

router.use("/api/auth", authRoute);
router.use("/api/usuarios", usuariosRoute);
router.use("/api/category", categoryRoute);
router.use("/api/product", productRoute)

module.exports = router;
