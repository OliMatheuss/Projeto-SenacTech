require('dotenv').config(); // ✅ PRIMEIRA LINHA

const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const missoesRoutes = require('./routes/missoesRoutes');
const recompensaRoutes = require('./routes/recompensaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Testa a conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão ao banco de dados estabelecida com sucesso.');
    }
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/missoes', missoesRoutes);
app.use('/api/recompensa', recompensaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});