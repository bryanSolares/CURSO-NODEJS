const { response } = require("express");
const { Categoria } = require("../models");

const addCategorie = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  let { name } = req.body;
  name = name.toUpperCase();
  user = req.uid;

  try {
    let categoriaDB = await Categoria.findOne({ name });
    if (categoriaDB) {
      response.msg = "La categoria ya existe en base de datos";
      return res.status(400).json(response);
    }

    categoriaDB = await new Categoria({ name, user }).save();

    response.msg = "Categoria guardada correctamente";
    response.ok = true;
    response.categoria = categoriaDB;
    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const updateCategorie = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { id } = req.params;
  let { name } = req.body;
  name = name.toUpperCase();
  user = req.uid;
  const query = { name, user };

  try {
    const categoria = await Categoria.findByIdAndUpdate(id, query, { new: true });
    response.ok = true;
    response.msg = "La categoria ha sido modificada correctamente";
    response.categoria = categoria;
    res.json(response);
  } catch (error) {
    esponse.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const deleteCategorie = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { id } = req.params;
  const query = { status: false };

  try {
    const categoria = await Categoria.findByIdAndUpdate(id, query);
    response.ok = true;
    response.msg = "La categoria ha sido eliminada correctamente";
    response.categoria = categoria;
    res.json(response);
  } catch (error) {
    esponse.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const allCategories = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };

  const { limit = 10, to = 0 } = req.query;
  const query = { status: true };
  try {
    const [categorias, count] = await Promise.all([
      Categoria.find(query).populate("user", "name").skip(Number(to)).limit(Number(limit)),
      Categoria.find(query).countDocuments(),
    ]);

    response.ok = true;
    response.count = count;
    response.categorias = categorias;
    res.json(response);
  } catch (error) {
    esponse.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const getCategorie = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { id } = req.params;
  const query = { status: true };

  try {
    const categoria = await Categoria.findById(id).populate("user", "name");

    response.ok = true;
    response.categoria = categoria;
    res.json(response);
  } catch (error) {
    esponse.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

module.exports = { allCategories, addCategorie, updateCategorie, deleteCategorie, getCategorie };
