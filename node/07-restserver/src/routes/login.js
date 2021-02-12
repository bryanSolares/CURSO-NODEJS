const router = require("express").Router();
const controller = require("../controllers/usuario.controller");

router.post("/login", controller.login);
router.post("/login/google", controller.saveTokenGoogle);

module.exports = router;
