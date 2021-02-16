const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validateJWT = async (req, res = response, next) => {
  let response = { ok: false, msg: "", error: null };

  const token = req.header("x-token");
  if (!token) {
    response.msg = "No hay token en la peticion";
    return res.status(401).json(response);
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario || !usuario.status) {
      response.msg = "Token no valido - Usuario no existe en BD";
      return res.status(401).json(response);
    }

    req.uid = uid;
    next();
  } catch (error) {
    response.msg = error.message || "Token no valido";
    response.error = error;
    res.status(401).json(response);
  }
};

module.exports = { validateJWT };
