const express = require('express');
const recompensaController = require('../controllers/recompensaController');

const router = express.Router();

// Criar uma recompensa
router.post('/', recompensaController.criarRecompensa);

// Listar recompensas de um usuário
router.get('/:usuario_id', recompensaController.listarRecompensas);

// Remover uma recompensa
router.delete('/:id', recompensaController.removerRecompensa);

// Resgatar uma recompensa aleatória
router.post('/resgatar', recompensaController.resgatarRecompensa);

module.exports = router;