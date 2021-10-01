const conexao = require("../infraestrutura/database/conexao");
const uploadDeArquivo = require("../infraestrutura/arquivos/uploadDeArquivo");

class Pet{

   lista(res){
      const sql = "SELECT * FROM pets";

      conexao.query(sql ,(erro, resultados) => {
         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(201).json(resultados);
         }
      });
   }

   adiciona(pet, res){

      const sql = "INSERT INTO pets SET ?";

      // Chama a função de upload da imagem
      uploadDeArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {

         if(erro){
            res.status(400).json(erro);
         }else{

            const novoPet =  {
               nome: pet.nome,
               imagem: novoCaminho
            }
   
            conexao.query(sql, novoPet, (erro) => {
      
               if(erro){
                  console.log(erro);
                  res.status(400).json(erro);
               }else{
                  res.status(200).json(novoPet);
               }
      
            });
            
         }

      });


   }

}

module.exports = new Pet();