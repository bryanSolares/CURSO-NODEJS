const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const loadFile = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };

  try {
    response.file = await subirArchivo(req.files);
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
  let modelo;

  try {
    switch (collection) {
      case "users":
        modelo = await Usuario.findById(id);
        if (!modelo || modelo.status === false) {
          response.msg = `No existe un usuario con el id ${id}`;
          return res.json(400).json(response);
        }
        break;
      case "products":
        modelo = await Producto.findById(id);
        if (!modelo || modelo.status === false) {
          response.msg = `No existe un producto con el id ${id}`;
          return res.json(400).json(response);
        }
        break;
      case "categories":
        break;

      default:
        response.msg = "Procedimiento no implementado por favor contactar al area de desarrollo";
        res.status(500).json(response);
        break;
    }

    modelo.image = await subirArchivo(req.files, undefined, collection);
    await modelo.save();

    response.ok = true;
    response.msg = modelo.image;
    res.json(response);
  } catch (error) {
    response.msg = error.message;
    response.error = error;
    return res.status(500).json(response);
  }
};

module.exports = { loadFile, updateFileCollection };
