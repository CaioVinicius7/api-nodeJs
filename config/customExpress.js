// Configurações do express
const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser");

module.exports = () => {

   const app = express();
   
   // Adiciona a bibliotaca bodyParser para o express usar
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(bodyParser.json());

   // usa o consign pra incluir todos os controllers dentro de nosso app
   consign().include("controllers").into(app);

   return app;

}