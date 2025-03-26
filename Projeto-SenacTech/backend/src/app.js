const express = require('express'); // Importa o framework Express
const cors = require('cors'); // Importa o pacote CORS para permitir requisições de diferentes origens
const db = require('./config/db'); // Importa a configuração do banco de dados
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const missoesRoutes = require('./routes/missoesRoutes'); // Importa as rotas relacionadas às missões
const recompensaRoutes = require('./routes/recompensaRoutes'); // Importa as rotas relacionadas às recompensas
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express(); // Cria uma instância do aplicativo Express
const PORT = process.env.PORT || 5000; // Define a porta do servidor, usando a variável de ambiente ou o padrão 5000

// Middleware
app.use(cors()); // Habilita CORS para permitir requisições de diferentes domínios
app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Testa a conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err); // Exibe erro caso a conexão falhe
    } else {
        console.log('Conexão ao banco de dados estabelecida com sucesso.'); // Exibe mensagem de sucesso na conexão
    }
});

// Define as rotas da API
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/missoes', missoesRoutes); // Rotas relacionadas às missões
app.use('/api/recompensa', recompensaRoutes); // Rotas relacionadas às recompensas

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Exibe mensagem informando que o servidor está rodando
});