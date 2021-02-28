const { Router } = require("express");
const router = Router();
const controller = require("../controllers/search.controller");
const { validateJWT } = require("../middlewares");

router.get("/:collection/:term", validateJWT, controller.search);

module.exports = router;
