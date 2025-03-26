const express = require('express');
const router = express.Router();
const missoesController = require('../controllers/missoesController');

// Rota para criar uma missão
router.post('/', missoesController.criarMissao);

// Rota para listar missões de um usuário
router.get('/usuario/:id', missoesController.listarMissoes);

// Rota para remover uma missão
router.delete('/:id', missoesController.removerMissao);

module.exports = router;