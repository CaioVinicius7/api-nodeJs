const moment = require("moment");
const conexao = require("../infraestrutura/conexao");

class Atendimento{

   // Método para adicionar novo atendimento
   adiciona(atendimento, res){
      
      // Pega a data de criação, formata a data do atendimento e cria um objeto novo incluindo essas datas
      const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
      const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");
      const atendimentoDatado = { ...atendimento, dataCriacao, data }; 

      // Valida se a data do serviço é a mesma ou é depois da data de criaç]ao do atendimento 
      const dataValida = moment(data).isSameOrAfter(dataCriacao);

      // Valida se o nome do cliente é maior ou igual a 5 
      const clientevalido = atendimento.cliente.length >= 5;

      // Objeto para verificar as validações
      const validacoes = [
         {
            nome: "data",
            valido: dataValida,
            mensagem: "A data deve ser maior ou igual a data atual"
         },
         {
            nome: "cliente",
            valido: clientevalido,
            mensagem: "O nome do cliente deve ter pelo menos 5 caracteres"
         }
      ]; 

      // Verifica se existiram erros na validação
      const erros = validacoes.filter((campo) => !campo.valido);
      const existemErros = erros.length;

      if(existemErros){
         res.status(400).json(erros);
      }else{

         const sql = "INSERT INTO atendimentos SET ?";
   
         conexao.query(sql, atendimentoDatado, (erro, resultados) => {
   
            if(erro){
               res.status(400).json(erro);
            }else{
               res.status(201).json({atendimento});
            }
   
         });

      }
      
   }

   // Método para listar todos os atendimentos
   lista(res){
      const sql = "SELECT * FROM atendimentos";

      conexao.query(sql ,(erro, resultados) => {
         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(201).json(resultados);
         }
      });
   }

   // Método para buscar um atendiment específico por id
   buscaPorId(id, res){

      const sql = `SELECT * FROM atendimentos WHERE id= ${id}`;

      conexao.query(sql, (erro, resultado) => {

         // Pega somente o objeto ao invés de um array
         const atendimento = resultado[0];

         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(200).json(atendimento);
         }

      });

   }

   // Edita um atendimento
   altera(id, valores, res){

      // Verifica se o campo data existe, caso exista formata a data
      if(valores.data){
         valores.data = moment(valores.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");
      }

      const sql = "UPDATE atendimentos Set ? WHERE id = ?";

      conexao.query(sql, [valores, id], (erro, resultado) => {

         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(200).json({ ...valores, id });
         }

      });

   }

   deleta(id, res){

      const sql = "DELETE FROM atendimentos WHERE id = ?";

      conexao.query(sql, id, (erro, resultado)=> {

         if(erro){
            res.status(400).json(erro);
         }else{
            res.status(200).json({id});
         }

      });

   }

}

module.exports = new Atendimento;