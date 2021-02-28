const databaseValidators = require("./database-validators");
const generateJWT = require("./generate-jwt");
const googleLogin = require("./google-verify");
const uploadFileH = require("./upload-file");

module.exports = {
  ...databaseValidators,
  ...generateJWT,
  ...googleLogin,
  ...uploadFileH,
};
