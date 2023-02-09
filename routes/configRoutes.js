const indexR = require("./index");
const usersR = require("./users");
const cakesR = require("./cakes");
const carsR = require("./cars");


exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/cakes",cakesR);
  app.use("/cars",carsR);

}