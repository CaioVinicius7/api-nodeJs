class Tabelas{

   init(conexao){
      this.conexao = conexao;

      this.criarAtendimentos();
      this.criaPets();
   }

   // Cria a tabela de atendimentos
   criarAtendimentos(){
      const sql = "CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao dateTime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))"

      this.conexao.query(sql, (erro) => {
         if(erro){
            console.log(`Ocorreu um erro: ${erro}`);
         }else{
            console.log("Tabela de atendimentos criada com sucesso!");
         }
      });
   }

   // Cria a tabela de pets 
   criaPets(){
      const sql = "CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY(id))";

      this.conexao.query(sql, (erro) => {
         if(erro){
            console.log(`Ocorreu um erro: ${erro}`);
         }else{
            console.log("Tabela de pets criada com sucesso!");
         }
      });
   }

}

module.exports =  new Tabelas;