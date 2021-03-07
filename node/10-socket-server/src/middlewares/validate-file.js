const { response } = require("express");

const validateFileUp = (req, res = response, next) => {
  let response = { ok: false, msg: "", error: null };

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    response.msg = "No se ha encontrado archivo para cargar";
    return res.status(400).json(response);
  }
  next();
};

module.exports = { validateFileUp };
