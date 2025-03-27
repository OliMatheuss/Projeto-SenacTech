// routes/missoesRoutes.js
const express = require('express');
const router = express.Router();
const missoesController = require('../controllers/missoesController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importe o middleware

// Rota protegida: requer autenticação para criar e remover missões
router.post('/', authMiddleware, missoesController.criarMissao); // <--- Middleware aplicado
router.delete('/:id', authMiddleware, missoesController.removerMissao); // <--- Middleware aplicado

// Rota não protegida: listar missões (se não precisar de autenticação)
router.get('/:id', missoesController.listarMissoes);

module.exports = router;