const jwt = require("jsonwebtoken");
const { SEED } = require("../config/config");

const verificaToken = (req, res, next) => {
  const token = req.get("x-token") || "";
<<<<<<< HEAD
  jwt.verify(token, SEED, (error, decoded) => {
=======
  jwt.verify(token, process.env.SEED || SEED, (error, decoded) => {
>>>>>>> b7b6cdbaafc7ec7c27dce51bbf6af5e77d2c8b53
    if (error) {
      res.status(401).json({ ok: false, error, msg: "Invalid Token" });
    }

    req.usuario = decoded.usuario;
    console.log(decoded);
    next();
  });
};

module.exports = { verificaToken };
