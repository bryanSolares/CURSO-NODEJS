const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const inicio = (req, res = response) => {
  res.send("Api Usuarios");
};

const createUser = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { name, email, password, role } = req.body;

  try {
    const emailExists = await Usuario.findOne({ email });
    if (emailExists) {
      response.msg = "El correo ya se encuentra en la base de datos";
      return res.status(400).json(response);
    }

    const usuario = new Usuario({ name, email, password, role });
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    response.ok = true;
    response.msg = "Usuario almacenado correctamente";
    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    res.json(response);
  }
};

module.exports = { inicio, createUser };
