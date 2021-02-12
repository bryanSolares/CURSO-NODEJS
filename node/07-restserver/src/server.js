const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const { port, mongoConnect, mongoConnectLocal } = require("./config/config");
const index = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

mongoose.connect(
  process.env.NODE_ENV ? mongoConnect : mongoConnectLocal,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (error) => {
    if (error) {
      console.log("Error en Conexión", error);
    }

    console.log("db online");
  }
);

app.use("/api", index);

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
