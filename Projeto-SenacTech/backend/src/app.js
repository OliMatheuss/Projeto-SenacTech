const express = require('express');
const db = require('./config/db'); // Importa a conexão com o MySQL
const authRoutes = require('./routes/authRoutes');
const missoesRoutes = require('./routes/missoesRoutes');
const recompensaRoutes = require('./routes/recompensaRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Testa a conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão ao banco de dados estabelecida com sucesso.');
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/missoes', missoesRoutes);
app.use('/api/recompensa', recompensaRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});