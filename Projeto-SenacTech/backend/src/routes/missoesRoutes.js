// routes/missoesRoutes.js
const express = require('express');
const router = express.Router();
const missoesController = require('../controllers/missoesController');
const authMiddleware = require('../middlewares/authMiddleware');

// concluir missão específica
router.put('/concluir/:id', authMiddleware, missoesController.concluirMissao);

// CRUD
router.post('/', authMiddleware, missoesController.criarMissao);
router.delete('/:id', authMiddleware, missoesController.removerMissao);

// listar missões DO USUÁRIO LOGADO
router.get('/:id', authMiddleware, missoesController.listarMissoes);

module.exports = router;
