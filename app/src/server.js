import app from './app.js';  // Importa o app

const PORT = process.env.PORT || 3000;  // Porta padrão 3000

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));  // Inicia o servidor






