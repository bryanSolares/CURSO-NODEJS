const { response } = require("express");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");
cloudinary.config(process.env.CLOUDINARY_URL);

const loadFile = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };

  try {
    response.file = await subirArchivo(req.files);
    const { tempFilePath } = req.files.file;
    await cloudinary.uploader.upload(tempFilePath);
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

      default:
        response.msg = "Procedimiento no implementado por favor contactar al area de desarrollo";
        res.status(500).json(response);
        break;
    }

    if (modelo.image) {
      const pathImage = path.join(__dirname, "../uploads", collection, modelo.image);
      if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
      }
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

const updateFileCollectionCloudinary = async (req, res = response) => {
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

      default:
        response.msg = "Procedimiento no implementado por favor contactar al area de desarrollo";
        res.status(500).json(response);
        break;
    }

    if (modelo.image) {
      const nombreArr = modelo.image.split("/");
      const nombre = nombreArr[nombreArr.length - 1].split(".")[0];
      cloudinary.uploader.destroy(nombre);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.image = secure_url;
    await modelo.save();

    response.ok = true;
    response.data = modelo;
    res.json(response);
  } catch (error) {
    response.msg = error.message;
    response.error = error;
    return res.status(500).json(response);
  }
};

const getFile = async (req, res = response) => {
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
      default:
        response.msg = "Procedimiento no implementado por favor contactar al area de desarrollo";
        res.status(500).json(response);
        break;
    }

    if (modelo.image) {
      const pathImage = path.join(__dirname, "../uploads", collection, modelo.image);
      if (fs.existsSync(pathImage)) {
        response.ok = true;
        return res.sendFile(pathImage);
      }
    }

    const defaultPath = path.join(__dirname, "../uploads", "no-image.jpg");
    res.sendFile(defaultPath);
  } catch (error) {
    response.msg = error.message;
    response.error = error;
    return res.status(500).json(response);
  }
};

module.exports = { loadFile, updateFileCollection, updateFileCollectionCloudinary, getFile };
