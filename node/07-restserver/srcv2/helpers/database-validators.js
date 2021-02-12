const Role = require("../models/role");
const Usuario = require("../models/usuario");

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

module.exports = { verifyRoleValid, verifyEmailExist, verifyIdExist };
