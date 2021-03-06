// Configurações do express
const express = require("express");
const consign = require("consign");

module.exports = () => {

   const app = express();
   
   // Adiciona a bibliotaca bodyParser para o express usar
   app.use(express.json());
   app.use(express.urlencoded({extended: true}));

   // usa o consign pra incluir todos os controllers dentro de nosso app
   consign().include("controllers").into(app);

   return app;

}