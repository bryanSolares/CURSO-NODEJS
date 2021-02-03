const router = require("express").Router();
const controller = require("../controllers/usuario.controller");

router.post("/login", controller.login);

module.exports = router;
