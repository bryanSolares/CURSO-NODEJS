const jwt = require("jsonwebtoken");

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

module.exports = { generarJWT };
