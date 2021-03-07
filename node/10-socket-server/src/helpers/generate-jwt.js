const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const generarJWT = (user) => {
  return new Promise((resolve, reject) => {
    const payload = { uid: user._id };
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { expiresIn: "4h" }, (error, token) => {
      if (error) {
        console.error(error);
        reject("Error al generar JWT");
      }
      resolve(token);
    });
  });
};

const checkJWT = async (token = "") => {
  try {
    if (token.length <= 10) {
      return null;
    }

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);

    if (!usuario || !usuario.status) {
      return null;
    }

    return usuario;
  } catch (error) {
    return null;
  }
};

module.exports = { generarJWT, checkJWT };
