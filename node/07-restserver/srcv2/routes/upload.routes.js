const { Router } = require("express");
const router = Router();
const { validateJWT } = require("../middlewares");
const controller = require("../controllers/upload.controller");
const { check } = require("express-validator");

router.post("/", validateJWT, controller.loadFile);
router.put(
  "/:collection/:id",
  validateJWT,
  check("collection", "La coleccion es obligatoria").notEmpty(),
  check("id", "El id debera ser valido").isMongoId(),
  controller.updateFileCollection
);

module.exports = router;
