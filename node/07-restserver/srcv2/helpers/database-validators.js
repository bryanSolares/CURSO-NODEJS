const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");
const { response } = require("express");
const { include } = require("underscore");

const verifyRoleValid = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El role ${role} no esta registrado en base de datos`);
  }
};

const verifyEmailExist = async (email = "") => {
  const emailExists = await Usuario.findOne({ email });
  if (emailExists) {
    throw new Error(`El email ${email} ya esta en base de datos`);
  }
};

const verifyIdExist = async (id = "") => {
  const idExists = await Usuario.findById(id);
  if (!idExists) {
    throw new Error(`El id ${id} no existe en base de datos`);
  }
};

const verifyIdExistsCategory = async (id = "") => {
  const idExist = await Categoria.findById(id);
  if (!idExist) {
    throw new Error(`El id ${id} no existe en base de datos`);
  }
};

const verifyCategoryDisable = async (id = "") => {
  const exists = await Categoria.findOne({ _id: id, status: true });
  if (!exists) {
    throw new Error(`El id ${id} no existe en base de datos`);
  }
};

const verifyIdExistsProduct = async (id = "") => {
  const idExist = await Producto.findById(id);
  if (!idExist) {
    throw new Error(`El id ${id} no existe en base de datos`);
  }
};

const verifyProductDisable = async (id = "") => {
  const exists = await Producto.findOne({ _id: id, status: true });
  if (!exists) {
    throw new Error(`El id ${id} no existe en base de datos`);
  }
};

const addProductRequest = async (req, res = response, next) => {
  let response = { ok: false, msg: "", error: null };
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id);
    req.producto = producto;
    next();
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const collectionsPermits = (collection = "", collections = []) => {
  if (!collections.includes(collection)) {
    throw new Error(`La coleccion ${collection} no es permitida: ${collections}`);
  }
  return true;
};

const verifyFilesParams = async (file = "") => {
  if (!file) {
    throw new Error(`No se ha encontrado archivo para cargar`);
  }
};

module.exports = {
  verifyRoleValid,
  verifyEmailExist,
  verifyIdExist,
  verifyIdExistsCategory,
  verifyCategoryDisable,
  verifyIdExistsProduct,
  verifyProductDisable,
  addProductRequest,
  collectionsPermits,
  verifyFilesParams,
};
