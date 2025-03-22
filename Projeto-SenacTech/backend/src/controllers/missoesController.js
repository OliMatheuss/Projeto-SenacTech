// backend/src/controllers/missoesController.js
const MissoesModel = require('../models/missoesModel');

// Cria uma nova missão
exports.criarMissao = async (req, res) => {
    const { usuario_id, descricao, valor_da_missao } = req.body;
    try {
        const novaMissao = await MissoesModel.create({ usuario_id, descricao, valor_da_missao });
        res.status(201).json(novaMissao);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar missão', error });
    }
};

// Lista as missões de um usuário
exports.listarMissoes = async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const missoes = await MissoesModel.findAll({ where: { usuario_id } });
        res.status(200).json(missoes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar missões', error });
    }
};

// Remove uma missão
exports.removerMissao = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await MissoesModel.destroy({ where: { id } });
        if (resultado) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Missão não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover missão', error });
    }
};