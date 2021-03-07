const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: { type: String, require: [true, "El nombre es obligatorio"] },
  email: { type: String, require: [true, "El correo es obligatorio"], unique: true },
  password: { type: String, require: [true, "La contrasenia es obligatoria"] },
  image: { type: String },
  role: { type: String, require: [true], default: "USER_ROLE", enum: ["ADMIN_ROLE", "USER_ROLE"] },
  status: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("Usuario", UsuarioSchema);
