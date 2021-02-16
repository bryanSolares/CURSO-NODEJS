const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const controller = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");

router.post(
  "/login",
  check("email", "El correo es obligatorio").isEmail(),
  check("password", "La contrasenia es obligatoria").notEmpty(),
  validarCampos,
  controller.login
);

module.exports = router;
