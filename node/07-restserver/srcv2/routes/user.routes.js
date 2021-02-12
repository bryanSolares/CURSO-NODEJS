const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const controller = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validar-campos");

router.get("/", controller.inicio);
router.post(
  "/new-user",
  check("name", "El nombre es obligatorio").notEmpty(),
  check("email", "El correo no es valido").isEmail(),
  check("password", "La contrasenia es obligatoria y debera tenes minimo 6 caracteres").notEmpty().isLength({ min: 6 }),
  check("role", "El role debe ser un role Valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
  validarCampos,
  controller.createUser
);

module.exports = router;
