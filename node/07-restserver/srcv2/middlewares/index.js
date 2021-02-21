const validateFields = require("./validar-campos");
const validateRoles = require("./validar-roles");
const validateJWT = require("./validate-jwt");

module.exports = {
  ...validateFields,
  ...validateRoles,
  ...validateJWT,
};
