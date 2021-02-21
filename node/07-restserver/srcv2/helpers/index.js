const databaseValidators = require("./database-validators");
const generateJWT = require("./generate-jwt");
const googleLogin = require("./google-verify");

module.exports = {
  ...databaseValidators,
  ...generateJWT,
  ...googleLogin,
};
