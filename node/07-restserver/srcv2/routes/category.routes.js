const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const controller = require("../controllers/category.controller");
const { validarCampos, validateJWT, validateAdminRole } = require("../middlewares");
const { verifyIdExistsCategory, verifyCategoryDisable } = require("../helpers");

router.post(
  "/categorias/add",
  validateJWT,
  check("name", "El nombre es obligatorio").notEmpty(),
  validarCampos,
  controller.addCategorie
);

router.put(
  "/categorias/update/:id",
  validateJWT,
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(verifyIdExistsCategory),
  check("id").custom(verifyCategoryDisable),
  check("name", "El nombre es obligatorio").notEmpty(),
  validarCampos,
  controller.updateCategorie
);

router.delete(
  "/categorias/delete/:id",
  validateJWT,
  validateAdminRole,
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(verifyIdExistsCategory),
  check("id").custom(verifyCategoryDisable),
  validarCampos,
  controller.deleteCategorie
);

router.get("/categorias", validateJWT, validarCampos, controller.allCategories);

router.get(
  "/categorias/:id",
  validateJWT,
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(verifyIdExistsCategory),
  check("id").custom(verifyCategoryDisable),
  validarCampos,
  controller.getCategorie
);

module.exports = router;
