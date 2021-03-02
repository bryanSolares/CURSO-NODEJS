const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
  name: { type: String, require: [true, "El nombre es obligatorio"], unique: true },
  status: { type: Boolean, default: true, require: true },
  user: { type: Schema.Types.ObjectId, ref: "Usuario", require: true },
  price: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: "Categoria", require: true },
  description: { type: String },
  image: { type: String },
  available: { type: Boolean, default: true },
});

module.exports = model("Producto", ProductoSchema);
