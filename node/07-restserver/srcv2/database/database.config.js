const mongoose = require("mongoose");

const databaseConnectionProd = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN_PROD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Base de Datos Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar base de datos");
  }
};

const databaseConnectionDev = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Base de Datos Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar base de datos");
  }
};

module.exports = { databaseConnectionProd, databaseConnectionDev };
