const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const controller = require("../controllers/category.controller");
const { validarCampos, validateJWT, validateAdminRole } = require("../middlewares");
const { verifyIdExistsCategory, verifyCategoryDisable } = require("../helpers");

router.post(
  "/add",
  validateJWT,
  check("name", "El nombre es obligatorio").notEmpty(),
  validarCampos,
  controller.addCategorie
);

router.put(
  "/update/:id",
  validateJWT,
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(verifyIdExistsCategory),
  check("id").custom(verifyCategoryDisable),
  check("name", "El nombre es obligatorio").notEmpty(),
  validarCampos,
  controller.updateCategorie
);

router.delete(
  "/delete/:id",
  validateJWT,
  validateAdminRole,
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(verifyIdExistsCategory),
  check("id").custom(verifyCategoryDisable),
  validarCampos,
  controller.deleteCategorie
);

router.get("/", validateJWT, validarCampos, controller.allCategories);

router.get(
  "/:id",
  validateJWT,
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(verifyIdExistsCategory),
  check("id").custom(verifyCategoryDisable),
  validarCampos,
  controller.getCategorie
);

module.exports = router;
