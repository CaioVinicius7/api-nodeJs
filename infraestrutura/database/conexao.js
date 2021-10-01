const mysql = require("mysql2");

// Cria a conexao com o banco de dados
const conexao = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   password: "mysqllocal",
   database: "agendaPetshop"
});

// Exporta a conexao
module.exports = conexao;