const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  name: { type: String, require: [true, "El nombre es obligatorio"], unique: true },
  status: { type: Boolean, default: true, require: true },
  user: { type: Schema.Types.ObjectId, ref: "Usuario", require: true },
});

module.exports = model("Categoria", CategoriaSchema);
