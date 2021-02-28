const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto, Role } = require("../models");
const collectionsPermits = ["users", "categories", "products", "roles"];

const searchInUsers = async (term = "") => {
  try {
    if (ObjectId.isValid(term)) {
      const usuario = await Usuario.findById(term);
      return usuario;
    }

    const regex = new RegExp(term, "i");
    const users = await Usuario.find({ $or: [{ name: regex }, { email: regex }], $and: { status: true } });
    return users;
  } catch (error) {
    console.log(error);
  }
};

const searchInCategories = async (term = "") => {
  try {
    if (ObjectId.isValid(term)) {
      const category = await Categoria.findById(term);
      return category;
    }

    const regex = new RegExp(term, "i");
    const categories = await Categoria.find({ name: regex, status: true });
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const searchInProducts = async (term = "") => {
  try {
    if (ObjectId.isValid(term)) {
      const product = await Producto.findById(term);
      return product;
    }

    const regex = new RegExp(term, "i");
    const products = await Producto.find({ name: regex, status: true }).populate("category", "name");
    console.log(regex, products);
    return products;
  } catch (error) {
    console.log(error);
  }
};

const searchRoles = async (term = "") => {
  try {
    if (ObjectId.isValid(term)) {
      const role = await Role.findById(term);
      return role;
    }

    const regex = new RegExp(term, "i");
    const roles = await Role.find({ role: regex });
    return roles;
  } catch (error) {
    console.log(error);
  }
};

const search = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };

  const { collection, term } = req.params;

  if (!collectionsPermits.includes(collection)) {
    response.msg = `La coleccion indicada no existe en base de datos: ${collectionsPermits}`;
    res.json(response);
  }

  try {
    switch (collection) {
      case "users":
        response.ok = true;
        response.usuarios = await searchInUsers(term);
        break;
      case "categories":
        response.ok = true;
        response.categorias = await searchInCategories(term);
        break;
      case "products":
        response.ok = true;
        response.productos = await searchInProducts(term);
        break;
      case "roles":
        response.ok = true;
        response.roles = await searchRoles(term);
        break;
      default:
        response.msg = "No hay busqueda implementada para la coleccion indicada";
        return res.status(500).json(response);
    }

    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

module.exports = { search };
