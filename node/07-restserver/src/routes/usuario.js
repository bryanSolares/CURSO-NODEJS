const router = require("express").Router();
const controller = require("../controllers/usuario.controller");

router.get("/", controller.rutaInicial);
router.post("/nuevo-usuario", controller.crearUsuario);
router.put("/editar-usuario/:id", controller.modificarUsuario);

module.exports = router;
