const moment = require("moment");
const axios = require("axios");
const conexao = require("../infraestrutura/database/conexao");
const repositorio = require("../repositorios/atendimentos");
const { promise } = require("../infraestrutura/database/conexao");

class Atendimento{

   constructor(){

      // Valida se a data do serviço é a mesma ou é depois da data de criaç]ao do atendimento 
      this.dataValida = ({ data, dataCriacao }) => {
         moment(data).isSameOrAfter(dataCriacao);
      }
         
      // Valida se o nome do cliente é maior ou igual a 5 
      this.clientevalido = (tamanho) => {
         tamanho >= 5;
      }

      // Função de validação
      this.valida = (parametros) => {
         this.validacoes.filter(campo => {
            const { nome } = campo;
            const parametro = parametros[nome];
         });

         return !campo.valido(parametro);
      }

      // Objeto para verificar as validações
      this.validacoes = [
         {
            nome: "data",
            valido: this.dataValida,
            mensagem: "A data deve ser maior ou igual a data atual"
         },
         {
            nome: "cliente",
            valido: this.clientevalido,
            mensagem: "O nome do cliente deve ter pelo menos 5 caracteres"
         }
      ]; 

   }

   // Método para adicionar novo atendimento
   adiciona(atendimento){
      
      // Pega a data de criação, formata a data do atendimento e cria um objeto novo incluindo essas datas
      const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
      const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss");
      const atendimentoDatado = { ...atendimento, dataCriacao, data }; 

      const parametros = {
         data: {
            data,
            dataCriacao
         },
         cliente: {
            tamanho: atendimento.cliente.length
         }
      };

      // Verifica se existiram erros na validação
      const erros = this.valida(parametros);
      const existemErros = erros.length;

      if(existemErros){
         return new Promise((resolve, reject) => {
            reject(erros)
         });
      }else{

         return repositorio.adiciona(atendimentoDatado).then((resultados) => {
            const id = resultados.insertId;
            return { ...atendimento, id };
         });
   
      }
      
   }

   // Método para listar todos os atendimentos
   lista(){
      return repositorio.lista();
   }

   // Método para buscar um atendiment específico por id
   buscaPorId(id, res){

      const sql = `SELECT * FROM atendimentos WHERE id= ${id}`;

      conexao.query(sql, async (erro, resultado) => {

         // Pega somente o objeto ao invés de um array
         const atendimento = resultado[0];

         // Pega o cpf do cliente
         const cpf = atendimento.cliente;

         if(erro){
            res.status(400).json(erro);
         }else{

            // Busca os dados de um cliente em um api externa 
            const { data } = await axios.get(`http://localhost:8082/${cpf}`);
            atendimento.cliente = data;
            
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