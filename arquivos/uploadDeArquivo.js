const fs = require("fs");
const path = require("path");

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {

   // Pega o tipo da imagem e verifica se é um tipo aceito
   const tipo = path.extname(caminho);
   const tiposValidos = ["jpg", "png", "jpeg"];
   const tipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

   if(tipoValido){

      // Salva o novo caminho da imagem e salva ela no diretorio desejado
      const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`;
   
      fs.createReadStream(caminho)
         .pipe(fs.createWriteStream(novoCaminho)
         .on("finish", () => callbackImagemCriada(false, novoCaminho))
      );

   }else{
      const erro = "tipo de arquivo inválido";
      console.log("Tipo invalido");
      callbackImagemCriada(erro);
   }

}