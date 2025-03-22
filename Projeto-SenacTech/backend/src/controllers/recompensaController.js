// backend/src/controllers/recompensaController.js
const Recompensa = require('../models/recompensaModel');

// Criar uma nova recompensa
exports.criarRecompensa = async (req, res) => {
    try {
        const { usuario_id, descricao } = req.body;
        const novaRecompensa = new Recompensa({ usuario_id, descricao });
        await novaRecompensa.save();
        res.status(201).json({ message: 'Recompensa criada com sucesso!', recompensa: novaRecompensa });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar recompensa', error });
    }
};

// Listar recompensas de um usuário
exports.listarRecompensas = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const recompensas = await Recompensa.find({ usuario_id });
        res.status(200).json(recompensas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar recompensas', error });
    }
};

// Remover uma recompensa
exports.removerRecompensa = async (req, res) => {
    try {
        const { id } = req.params;
        await Recompensa.findByIdAndDelete(id);
        res.status(200).json({ message: 'Recompensa removida com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover recompensa', error });
    }
};

// Resgatar uma recompensa aleatória
exports.resgatarRecompensa = async (req, res) => {
    try {
        const { usuario_id } = req.body;
        const pontos = 500; // Custo para resgatar a recompensa

        // Aqui você deve implementar a lógica para verificar se o usuário tem pontos suficientes
        // e selecionar uma recompensa aleatória

        const recompensas = await Recompensa.find({ usuario_id });
        if (recompensas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma recompensa disponível para resgatar.' });
        }

        const recompensaAleatoria = recompensas[Math.floor(Math.random() * recompensas.length)];
        // Aqui você deve implementar a lógica para subtrair os pontos do usuário

        res.status(200).json({ message: 'Recompensa resgatada com sucesso!', recompensa: recompensaAleatoria });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao resgatar recompensa', error });
    }
};