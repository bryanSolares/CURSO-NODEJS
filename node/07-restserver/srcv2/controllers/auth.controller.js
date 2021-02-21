const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT, googleVerify } = require("../helpers");

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

module.exports = { login, loginGoogle };

// at_hash: "6c1WUVDVOWLm86Duj60CwQ";
// aud: "714908324686-uengfu8bp9voeqtbcn493e9632230515.apps.googleusercontent.com";
// azp: "714908324686-uengfu8bp9voeqtbcn493e9632230515.apps.googleusercontent.com";
// email: "guitarraviva18@gmail.com";
// email_verified: true;
// exp: 1613872393;
// family_name: "Solares";
// given_name: "Josué";
// iat: 1613868793;
// iss: "accounts.google.com";
// jti: "f5f12464bd0ce90ed076252041f7c8c0c3f829d9";
// locale: "es-419";
// name: "Josué Solares";
// picture: "https://lh3.googleusercontent.com/a-/AOh14GjylNYavspEkozKrqtXTuEDN-2Tx6lRM5R6mgCAtw=s96-c";
// sub: "107359119081858517617";
