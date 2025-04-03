// routes/missoesRoutes.js
const express = require('express');
const router = express.Router();
const missoesController = require('../controllers/missoesController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware de autenticação

// Rota protegida: requer autenticação para criar e remover missões
router.post('/', authMiddleware, missoesController.criarMissao);
router.delete('/:id', authMiddleware, missoesController.removerMissao);

// Rota protegida para listar missões de um usuário específico
router.get('/:id', authMiddleware, missoesController.listarMissoes);
router.put('/concluir/:id', authMiddleware, missoesController.concluirMissao);


module.exports = router;