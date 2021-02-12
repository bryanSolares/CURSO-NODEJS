const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: { type: String, require: [true, "El nombre es obligatorio"] },
  email: { type: String, require: [true, "El correo es obligatorio"], unique: true },
  password: { type: String, require: [true, "La contrasenia es obligatoria"] },
  image: { type: String },
  role: { type: String, require: [true], enum: ["ADMIN_ROLE", "USER_ROLE"] },
  status: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

module.exports = model("Usuario", UsuarioSchema);
