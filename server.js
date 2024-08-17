const express = require('express');
const path = require('path');
const app = express();

// Define o caminho da pasta pública
app.use(express.static(path.join(__dirname, "public")));

// Rota para o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Configuração da porta para o Heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});