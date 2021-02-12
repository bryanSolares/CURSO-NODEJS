const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const inicio = (req, res = response) => {
  res.send("Api Usuarios");
};

const getAllUsers = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { limit = 5, to = 0 } = req.query;
  const query = { status: true };

  try {
    const [users, count] = await Promise.all([
      Usuario.find(query).skip(Number(to)).limit(Number(limit)),
      Usuario.find(query).countDocuments(),
    ]);

    response.ok = true;
    response.msg = "";
    response.users = users;
    response.count = count;
    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    res.json(response);
  }
};

const createUser = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { name, email, password, role } = req.body;

  try {
    const user = new Usuario({ name, email, password, role });
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    response.ok = true;
    response.msg = "Usuario almacenado correctamente";
    response.user = user;
    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    res.json(response);
  }
};

const updateUser = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { id } = req.params;
  const { _id, password, email, google, ...userLast } = req.body;

  try {
    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      userLast.password = bcryptjs.hashSync(password, salt);
    }

    const userNew = await Usuario.findByIdAndUpdate(id, userLast);

    response.ok = true;
    response.msg = "Usuario modificado correctamente";
    response.user = userNew;
    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    res.json(response);
  }
};

const deleteUser = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { id } = req.params;
  const query = { status: false };

  try {
    const userNew = await Usuario.findByIdAndUpdate(id, query);

    response.ok = true;
    response.msg = "Usuario eliminado correctamente";
    response.user = userNew;
    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    res.json(response);
  }
};

module.exports = { inicio, createUser, updateUser, getAllUsers, deleteUser };
