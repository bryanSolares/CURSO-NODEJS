const router = require("express").Router();
const controller = require("../controllers/usuario.controller");
const { verificaToken } = require("../middlewares/autenticacion");

router.get("/", verificaToken, controller.rutaInicial);
router.post("/nuevo-usuario", verificaToken, controller.crearUsuario);
router.put("/editar-usuario/:id", verificaToken, controller.modificarUsuario);
router.get("/todos", verificaToken, controller.mostrarTodos);
router.delete("/eliminar/:id", verificaToken, controller.eliminarUno);

module.exports = router;
