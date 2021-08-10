module.exports = (app) => {
   
   // Rotas
   app.get("/", (req, res) => {
      res.send("Servidor rodando, tudo ok!");
   });
   
   app.get("/atendimentos", (req, res) => {
      res.send("Você está na rota de atendimentos!");
   });

}