const { response } = require("express");
const { Producto } = require("../models");

const addProduct = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  let { name, price = 0, category, available = true } = req.body;
  name = name.toUpperCase();
  price = Number(price);
  user = req.uid;

  try {
    let productoBD = await Producto.findOne({ name });
    if (productoBD) {
      response.msg = "El producto ya existe en base de datos";
      return res.status(400).json(response);
    }

    productoBD = await new Producto({ name, user, price, category, available }).save();

    response.msg = "Producto guardado correctamente";
    response.ok = true;
    response.producto = productoBD;
    res.json(response);
  } catch (error) {
    response.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const updateProduct = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { id } = req.params;
  let { ...data } = req.body;
  data.name = data.name.toUpperCase();
  data.price = Number(data.price);
  data.user = req.uid;

  try {
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    response.ok = true;
    response.producto = producto;
    response.msg = "El producto ha sido modificado correctamente";
    res.json(response);
  } catch (error) {
    esponse.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const deleteProduct = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { id } = req.params;
  const query = { status: false };

  try {
    const producto = await Producto.findByIdAndUpdate(id, query);
    response.ok = true;
    response.msg = "El producto ha sido eliminada correctamente";
    response.producto = producto;
    res.json(response);
  } catch (error) {
    esponse.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const allProducts = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };

  const { limit = 10, to = 0 } = req.query;
  const query = { status: true };
  try {
    const [productos, count] = await Promise.all([
      Producto.find(query).populate("user", "name").populate("category", "name").skip(Number(to)).limit(Number(limit)),
      Producto.find(query).countDocuments(),
    ]);

    response.ok = true;
    response.count = count;
    response.productos = productos;
    res.json(response);
  } catch (error) {
    esponse.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

const getProduct = async (req, res = response) => {
  let response = { ok: false, msg: "", error: null };
  const { id } = req.params;
  const query = { status: true };

  try {
    const producto = await Producto.findById(id).populate("user", "name").populate("category", "name");

    response.ok = true;
    response.producto = producto;
    res.json(response);
  } catch (error) {
    esponse.msg = error.message || "Error en base de datos";
    response.error = error;
    return res.status(500).json(response);
  }
};

module.exports = { allProducts, addProduct, updateProduct, deleteProduct, getProduct };
