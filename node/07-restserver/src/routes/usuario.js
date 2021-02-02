const router = require("express").Router();
const controller = require("../controllers/usuario.controller");

router.get("/", controller.rutaInicial);
router.post("/nuevo-usuario", controller.crearUsuario);
router.put("/editar-usuario/:id", controller.modificarUsuario);
router.get("/todos", controller.mostrarTodos);
router.delete("/eliminar/:id", controller.eliminarUno);

module.exports = router;
