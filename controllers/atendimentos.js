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
         },
         {
            "função": "Lista todos os pets",
            "endpoint": "/pets",
            "método http": "GET"
         },
         {
            "função": "Adicionar um atendimento",
            "endpoint": "/pets",
            "método http": "POST"
         }
      ];

      res.json(rotas); 
      
   });
   
   // Lista todos os atendimentos
   app.get("/atendimentos", async (req, res) => {

      await Atendimento.lista().then((resultados) => {
         res.status(200).json(resultados);
      }).catch((erros) => {
         res.status(400).json(erros);
      });

   });

   // Lista um atendimento específico
   app.get("/atendimento/:id", async (req, res) => {

      // Converte o id de string para number
      const id = parseInt(req.params.id);
      
      await Atendimento.buscaPorId(id, res);
      
   });

   // Adiciona novos atendimentos
   app.post("/atendimentos", async (req, res) => {
      const atendimento = req.body;

      await Atendimento.adiciona(atendimento).then((atendimentoCadastrado) => {
         res.status(201).json(atendimentoCadastrado);
      }).catch((erros) => {
         res.status(400).json(erros);
      });
      
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