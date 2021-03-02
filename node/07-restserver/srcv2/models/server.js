const express = require("express");
const path = require("path");
const cors = require("cors");
const fileUploads = require("express-fileupload");
const routes = require("../routes/index.routes");
const { databaseConnectionProd } = require("../database/database.config");
const morgan = require("morgan");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.connectDataBase();
    this.middlewares();
    this.routes();
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

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on Port ${this.port}`);
    });
  }
}

module.exports = Server;
