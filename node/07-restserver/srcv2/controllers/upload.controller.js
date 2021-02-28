const { response } = require("express");

const { subirArchivo } = require("../helpers");

const loadFile = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    response.msg = "No se ha encontrado archivo para cargar";
    return res.status(400).json(response);
  }

  try {
    response.file = await subirArchivo(req.files, ["png", "jpg", "jpeg", "gif"]);
    response.msg = "Archivo cargado exitosamente";
    response.ok = true;
    res.json(response);
  } catch (error) {
    response.msg = error.message;
    response.error = error;
    return res.status(500).json(response);
  }
};

const updateFileCollection = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { collection, id } = req.params;
  try {
    res.json(response);
  } catch (error) {
    response.msg = error.message;
    response.error = error;
    return res.status(500).json(response);
  }
};

module.exports = { loadFile, updateFileCollection };
