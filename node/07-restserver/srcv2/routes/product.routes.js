const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const controller = require("../controllers/product.controller");
const { validarCampos, validateJWT, validateAdminRole } = require("../middlewares");
const {
  verifyIdExistsCategory,
  verifyCategoryDisable,
  verifyProductDisable,
  verifyIdExistsProduct,
  addProductRequest,
} = require("../helpers");

router.post(
  "/add",
  validateJWT,
  check("name", "El nombre es obligatorio").notEmpty(),
  check("category", "La categoria es obligatoria").isMongoId(),
  check("category").custom(verifyIdExistsCategory),
  check("category").custom(verifyCategoryDisable),
  validarCampos,
  controller.addProduct
);

router.put(
  "/update/:id",
  validateJWT,
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(verifyIdExistsProduct),
  check("id").custom(verifyProductDisable),
  check("name", "El nombre es obligatorio").notEmpty(),
  check("category", "La categoria es obligatoria").isMongoId(),
  check("category").custom(verifyIdExistsCategory),
  check("category").custom(verifyCategoryDisable),
  check("available", "El estado disponible es obligatorio y debera ser un verdadero o falso").isBoolean(),
  check("price", "El precio es obligatorio y de tipo numerico").isNumeric(),
  addProductRequest,
  validarCampos,
  controller.updateProduct
);

router.delete(
  "/delete/:id",
  validateJWT,
  validateAdminRole,
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(verifyIdExistsProduct),
  check("id").custom(verifyProductDisable),
  validarCampos,
  controller.deleteProduct
);

router.get("/", validateJWT, validarCampos, controller.allProducts);

router.get(
  "/:id",
  validateJWT,
  check("id", "El id es obligatorio").isMongoId(),
  check("id").custom(verifyIdExistsProduct),
  check("id").custom(verifyProductDisable),
  validarCampos,
  controller.getProduct
);

module.exports = router;
