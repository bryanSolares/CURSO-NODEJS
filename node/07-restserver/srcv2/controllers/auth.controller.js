const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !usuario.status) {
      response.msg = "El correo ingresado no existe";
      return res.status(400).json(response);
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      response.msg = "Usuario o Contrasenia incorrectos";
      return res.status(400).json(response);
    }

    const token = await generarJWT(usuario);

    response.ok = true;
    response.msg = "Bienvenido";
    response.usuario = usuario;
    response.token = token;
    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    res.status(500).json(response);
  }
};

module.exports = { login };
