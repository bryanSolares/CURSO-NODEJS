const jwt = require("jsonwebtoken");
const { SEED } = require("../config/config");

const verificaToken = (req, res, next) => {
  let response = { error: null, ok: false, msg: "" };
  const token = req.get("x-token") || "";
  jwt.verify(token, SEED, (error, decoded) => {
    if (error) {
      response.error = error;
      response.msg = "Invalid Token";
      res.status(401).json(response);
    }

    req.usuario = decoded.usuario;
    next();
  });
};

const verificaAdminRole = (req, res, next) => {
  let response = { error: null, ok: false, msg: "" };
  try {
    const { role } = req.usuario;

    if (role !== "ADMIN_ROLE") {
      response.msg = "Solo un usuario administrador puede realizar esta accion";
      return res.json(response);
    }

    next();
  } catch (error) {
    response.error = error;
    response.msg = "Error en verificar los permisos del usuario";
    res.json(response);
  }
};

module.exports = { verificaToken, verificaAdminRole };
