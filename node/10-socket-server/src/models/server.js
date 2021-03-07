const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { createServer } = require("http");
const fileUploads = require("express-fileupload");
const { socketController } = require("../sockets/socket.controller");
const routes = require("../routes/index.routes");
const { databaseConnectionProd } = require("../database/database.config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.connectDataBase();
    this.middlewares();
    this.routes();
    this.sockets();
  }

  async connectDataBase() {
    await databaseConnectionProd();
  }

  middlewares() {
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(fileUploads({ useTempFiles: true, tempFileDir: "/temp/" }));
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/", routes);
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server on Port ${this.port}`);
    });
  }
}

module.exports = Server;
