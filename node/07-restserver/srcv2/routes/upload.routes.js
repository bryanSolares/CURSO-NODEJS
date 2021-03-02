const { Router } = require("express");
const router = Router();
const { validateJWT, validarCampos, validateFileUp } = require("../middlewares");
const controller = require("../controllers/upload.controller");
const { check } = require("express-validator");
const { collectionsPermits } = require("../helpers");

router.post("/", validateJWT, validateFileUp, validarCampos, controller.loadFile);
router.put(
  "/:collection/:id",
  validateJWT,
  validateFileUp,
  check("collection", "La coleccion es obligatoria").notEmpty(),
  check("collection").custom((c) => collectionsPermits(c, ["users", "products"])),
  check("id", "El id debera ser valido").isMongoId(),
  validarCampos,
  controller.updateFileCollection
);

module.exports = router;
