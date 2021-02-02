const bcryp = require("bcrypt");
const _ = require("underscore");
const Usuario = require("../models/usuario");

const rutaInicial = (req, res) => {
  res.json({ ok: true, msg: "API *** api/usuario *** API V1.0" });
};

const crearUsuario = (req, res) => {
  let response = { error: null, ok: false, msg: "" };

  let { nombre, email, password, role } = req.body;
  let usuarioNuevo = new Usuario({ nombre, email, password: bcryp.hashSync(password, 10), role });

  usuarioNuevo.save((error, usuarioDB) => {
    if (error) {
      response.error = error;
      response.msg = error.message || "Error al grabar en BD";
      return res.status(400).json(response);
    }

    response.msg = "Usuario grabado en BD";
    response.ok = true;
    response.usuario = usuarioDB;

    res.json(response);
  });
};

const modificarUsuario = (req, res) => {
  let response = { error: null, ok: false, msg: "" };
  const { id } = req.params;
  const body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, usuarioBD) => {
    if (error) {
      response.error = error;
      response.msg = error.message || "No existe usuario con id indicado";
      return res.status(400).json(response);
    }

    response.ok = true;
    response.msg = "Usuario modificado correctamente";
    response.usuario = usuarioBD;

    res.json(response);
  });
};

const mostrarTodos = (req, res) => {
  let response = { error: null, ok: false, msg: "" };

  let desde = Number(req.query.desde) || 0;
  let limite = Number(req.query.limite) || 5;

  try {
    Usuario.find({ estado: true }, "nombre email role estado google img")
      .skip(desde)
      .limit(limite)
      .exec((error, usuarios) => {
        if (error) {
          response.error = error;
          response.msg = error.message || "No es posible realizar la consulta";
          return res.status(400).json(response);
        }

        Usuario.count({ estado: true }, (error, contador) => {
          response.ok = true;
          response.usuarios = usuarios;
          response.totalUsuarios = contador;
          res.json(response);
        });
      });
  } catch (error) {
    response.error = error;
    response.ok = false;
    response.msg = error.message || "Error en base de datos";
    res.json(response);
  }
};

const eliminarUno = (req, res) => {
  let response = { error: null, ok: false, msg: "" };
  let { id } = req.params;

  try {
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (error, usuarioBorrado) => {
      if (error || !usuarioBorrado) {
        response.error = error;
        response.msg = "No es posible eliminar el usuario o no existe en base de datos";
        return res.status(400).json(response);
      }

      response.ok = true;
      response.msg = "Usuario eliminado";
      response.usuario = usuarioBorrado;
      res.json(response);
    });
  } catch (error) {
    response.error = error;
    response.ok = false;
    response.msg = error.message || "Error en base de datos";
    res.json(response);
  }
};

module.exports = { rutaInicial, crearUsuario, modificarUsuario, mostrarTodos, eliminarUno };
