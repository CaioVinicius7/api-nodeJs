const query = require("../infraestrutura/database/queries");
const axios = require("axios");

class Atendimento{

   async adiciona(atendimento){

      const sql = "INSERT INTO atendimentos SET ?";

      return await query(sql, atendimento);

   }

   async lista(){

      const sql = "SELECT * FROM atendimentos";

      return await query(sql);

   }

}

module.exports = new Atendimento;