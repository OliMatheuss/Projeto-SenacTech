const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const missoesRoutes = require('./routes/missoesRoutes');
const recompensaRoutes = require('./routes/recompensaRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao banco de dados!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/missoes', missoesRoutes);
app.use('/api/recompensa', recompensaRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});