const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const controller = require("../controllers/user.controller");

const { verifyRoleValid, verifyEmailExist, verifyIdExist } = require("../helpers");
const { validarCampos, validateAdminRole, rolesValidAdmit, validateJWT } = require("../middlewares");

router.get("/", controller.inicio);
router.get("/all-users", validateJWT, controller.getAllUsers);
router.post(
  "/new-user",
  validateJWT,
  check("name", "El nombre es obligatorio").notEmpty(),
  check("email", "El correo no es valido").isEmail(),
  check("email").custom(verifyEmailExist),
  check("password", "La contrasenia es obligatoria y debera tenes minimo 6 caracteres").notEmpty().isLength({ min: 6 }),
  check("role").custom(verifyRoleValid),
  validarCampos,
  controller.createUser
);
router.put(
  "/update-user/:id",
  validateJWT,
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(verifyIdExist),
  validarCampos,
  controller.updateUser
);
router.delete(
  "/delete/:id",
  validateJWT,
  //validateAdminRole,
  //rolesValidAdmit("ADMIN_ROLE", "VENTAS_ROLE"),
  check("id", "El id no es valido").isMongoId(),
  check("id").custom(verifyIdExist),
  validarCampos,
  controller.deleteUser
);

module.exports = router;
