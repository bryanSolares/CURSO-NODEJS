const jwt = require("jsonwebtoken");
const { SEED } = require("../config/config");

const verificaToken = (req, res, next) => {
  const token = req.get("x-token") || "";
  jwt.verify(token, SEED, (error, decoded) => {
    if (error) {
      res.status(401).json({ ok: false, error, msg: "Invalid Token" });
    }

    req.usuario = decoded.usuario;
    console.log(decoded);
    next();
  });
};

module.exports = { verificaToken };
