const express = require('express');
const recompensaController = require('../controllers/recompensaController');
const autenticarUsuario = require('../middlewares/authMiddleware'); // Middleware de autenticação

const router = express.Router();

// Criar uma recompensa (precisa estar autenticado)
router.post('/', autenticarUsuario, recompensaController.criarRecompensa);

// Listar recompensas do usuário autenticado (removido `:usuario_id` da URL)
router.get('/', autenticarUsuario, recompensaController.listarRecompensas);

// Remover uma recompensa (só o próprio usuário pode remover)
router.delete('/:id', autenticarUsuario, recompensaController.removerRecompensa);

// Resgatar uma recompensa aleatória (só o próprio usuário pode resgatar)
router.post('/resgatar/:id', autenticarUsuario, recompensaController.resgatarRecompensa);

module.exports = router;