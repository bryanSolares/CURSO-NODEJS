const validateFields = require("./validar-campos");
const validateRoles = require("./validar-roles");
const validateJWT = require("./validate-jwt");
const validateFileUp = require("./validate-file");

module.exports = {
  ...validateFields,
  ...validateRoles,
  ...validateJWT,
  ...validateFileUp,
};
