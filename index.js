const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/tabelas");
const app = customExpress();

// Conecta com o banco de dados
conexao.connect((error) => {

   if(error){
      console.log(`Ocorreu um erro: ${error}`);
   }else{
      console.log("conectado com sucesso!");

      // Inicializa as tabelas
      Tabelas.init(conexao);

      // Inicializa o servidor na porta 3000
      app.listen(3000, () => {
         console.log("Servidor rodando: http://localhost:3000");
      });
   }

});

