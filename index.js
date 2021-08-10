const customExpress = require("./config/customExpress");
const app = customExpress();

// Inicializa o servidor na porta 3000
app.listen(3000, () => {
   console.log("Servidor rodando: http://localhost:3000");
});
