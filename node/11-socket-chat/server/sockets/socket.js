const { io } = require("../server");
const Usuario = require("./classes/usuarios");
const users = new Usuario();

io.on("connection", (client) => {
  client.on("entrarChat", (user, callback) => {
    if (!user.name) {
      return callback({ error: true, msg: "El nombre es obligatorio" });
    }

    let persons = users.addPerson(client.id, user.name);
    callback(persons);
  });
});
