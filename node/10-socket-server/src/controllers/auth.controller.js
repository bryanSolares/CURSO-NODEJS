const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT, googleVerify } = require("../helpers");

const login = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
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

const loginGoogle = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { id_token } = req.body;
  try {
    const { name, email, image, google } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      usuario = new Usuario({ name, email, image, google, password: "****" });
      await usuario.save();
    } else if (!usuario.status) {
      response.msg = "Hable con el administrador, usuario bloqueado";
      return res.status(401).json(response);
    }

    const token = await generarJWT(usuario);
    response.user = usuario;
    response.token = token;
    response.ok = true;
    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en token de Google";
    response.error = error;
    res.status(500).json(response);
  }
};

const renewToken = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { uid } = req;
  try {
    let usuario = await Usuario.findById(uid);
    if (!usuario || !usuario.status) {
      response.msg = "Hable con el administrador, usuario no existe";
      return res.status(401).json(response);
    }
    const token = await generarJWT(usuario);

    response.ok = true;
    response.user = usuario;
    response.token = token;

    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en token de Google";
    response.error = error;
    res.status(500).json(response);
  }
};

module.exports = { login, loginGoogle, renewToken };
