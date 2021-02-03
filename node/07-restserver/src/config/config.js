module.exports = {
  port: process.env.PORT || 3000,
  mongoConnect: "mongodb+srv://mean_full:BvnThwmJd49rL8Et@cluster0.gw8x9.mongodb.net/cafe", // process.env.MONGO_URI
  mongoConnectLocal: "mongodb://localhost:27017/cafe",
  CADUCIDAD_TOKEN: 60 * 60 * 24 * 30,
  SEED: "MISEEDULTRASECRETODESARROLLO",
};

// mongodb+srv://mean_full:BvnThwmJd49rL8Et@cluster0.gw8x9.mongodb.net/cafe

/*
heroku config:set MONGO_URI="mongodb+srv://mean_full:BvnThwmJd49rL8Et@cluster0.gw8x9.mongodb.net/cafe"
heroku config: set CADUCIDAD_TOKEN=60*60*24*30
heroku config: set SEED="MISEEDULTRASECRETOPRODUCCION"
*/
