const { response } = require("express");
const Usuario = require("../models/usuario");

const validateAdminRole = async (req, res = response, next) => {
  let response = { ok: false, msg: "", error: null };

  if (!req.uid) {
    response.msg = "Se quiere verificar el role sin valida el token en primer lugar";
    return res.status(500).json(response);
  }

  try {
    const usuario = await Usuario.findById(req.uid);
    const { role, name } = usuario;

    if (role !== "ADMIN_ROLE") {
      response.msg = `${name} no es Administrador`;
      return res.status(401).json(response);
    }

    next();
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const rolesValidAdmit = (...roles) => {
  return async (req, res = response, next) => {
    let response = { ok: false, msg: "", error: null };
    const { uid } = req;
    try {
      const { role, name } = await Usuario.findById(uid);
      if (!roles.includes(role)) {
        response.msg = `${name} no tiene uno de estos roles ${roles}`;
        return res.status(401).json(response);
      }
      next();
    } catch (error) {
      response.msg = error.message || "Error en base de datos";
      response.error = error;
      return res.status(500).json(response);
    }

    next();
  };
};

module.exports = { validateAdminRole, rolesValidAdmit };
