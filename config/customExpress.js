const express = require("express");
const consign = require("consign");

module.exports = () => {

   const app = express();
   
   // usa o consign pra incluir todos os controllers dentro de nosso app
   consign().include("controllers").into(app);

   return app;

}