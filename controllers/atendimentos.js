const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
   
   // Rotas
   app.get("/", (req, res) => {
      res.send("Servidor rodando, tudo ok!");
   });
   
   app.get("/atendimentos", (req, res) => {
      res.send("Você está na rota de atendimentos!");
   });

   app.post("/atendimentos", (req, res) => {
      const atendimento = req.body;

      // Chama o model de atendimento executando o método de adicionar atendimento
      Atendimento.adiciona(atendimento);
      res.send("Você está na rota de atendimentos e está realizando um post!");
   });

}