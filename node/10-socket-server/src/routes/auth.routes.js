const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const controller = require("../controllers/auth.controller");
const { validarCampos, validateJWT } = require("../middlewares");

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

router.get("/validate-token", validateJWT, controller.renewToken);

module.exports = router;
