const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
   
   // Rotas
   app.get("/", (req, res) => {

      const rotas = [
         {
            "função": "Listar um único atendimento",
            "endpoint": "/atendimento/id",
            "método http": "GET"
         },
         {
            "função": "Listar todos os atendimentos",
            "endpoint": "/atendimentos",
            "método http": "GET"
         },
         {
            "função": "Criar um atendimentos",
            "endpoint": "/atendimentos/id",
            "método http": "POST"
         },
         {
            "função": "Editar um atendimento",
            "endpoint": "/atendimentos/id",
            "método http": "PATCH"
         },
         {
            "função": "Excluir um atendimento",
            "endpoint": "/atendimentos/id",
            "método http": "DELETE"
         }
      ];

      res.json(rotas); 
      
   });
   
   // Lista todos os atendimentos
   app.get("/atendimentos", (req, res) => {
      Atendimento.lista(res);
   });

   // Lista um atendimento específico
   app.get("/atendimento/:id", (req, res) => {

      // Converte o id de string para number
      const id = parseInt(req.params.id);
      
      Atendimento.buscaPorId(id, res);
      
   });

   // Adiciona novos atendimentos
   app.post("/atendimentos", (req, res) => {
      const atendimento = req.body;

      Atendimento.adiciona(atendimento, res);
   });

   // Edita um atendimento
   app.patch("/atendimentos/:id", (req, res) => {

      // Converte o id de string para number e pega os dados que vão ser alterados
      const id = parseInt(req.params.id);
      const valores = req.body;

   
      Atendimento.altera(id, valores, res);   
   });

   app.delete("/atendimentos/:id", (req, res) => {
      const id = parseInt(req.params.id);

      Atendimento.deleta(id, res);

   });

}