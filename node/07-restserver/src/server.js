const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { port } = require("./config/config");
const index = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/cafe", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (error) {
    console.log("Error en Conexión", error);
  }

  console.log("db online");
});

app.use("/api", index);

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
