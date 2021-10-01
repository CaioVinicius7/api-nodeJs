const Pet = require("../models/pets");

module.exports = (app) => {
   
   // Rotas
   app.get("/pet", (req, res) => {
      Pet.lista(res);
   });

   app.post("/pet", (req, res) => {
      const pet = req.body;

      Pet.adiciona(pet, res);
   });

}