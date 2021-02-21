const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const controller = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares");

router.post(
  "/login",
  check("email", "El correo es obligatorio").isEmail(),
  check("password", "La contrasenia es obligatoria").notEmpty(),
  validarCampos,
  controller.login
);

router.post(
  "/login/google",
  check("id_token", "El id_token es necesario").notEmpty(),
  validarCampos,
  controller.loginGoogle
);

module.exports = router;
