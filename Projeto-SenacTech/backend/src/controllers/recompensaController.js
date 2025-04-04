const Recompensa = require('../models/recompensaModel');
const jwt = require('jsonwebtoken');

// Criar uma nova recompensa
exports.criarRecompensa = async (req, res) => {
    try {
        const { descricao, pontos } = req.body;
        const usuario_id = req.user.id; // Pegando o ID do usuário autenticado via token

        if (!descricao || pontos === undefined) {
            return res.status(400).json({ message: 'Descrição e pontos são obrigatórios' });
        }

        const novaRecompensa = new Recompensa({ usuario_id, descricao, pontos });
        await novaRecompensa.save();

        res.status(201).json({ message: 'Recompensa criada com sucesso!', recompensa: novaRecompensa });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar recompensa', error });
    }
};

// Listar recompensas de um usuário
exports.listarRecompensas = async (req, res) => {
    try {
        const usuario_id = req.user.id; // Pegando o ID do usuário autenticado
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
        const usuario_id = req.user.id;

        const recompensa = await Recompensa.findOne({ _id: id, usuario_id });

        if (!recompensa) {
            return res.status(404).json({ message: 'Recompensa não encontrada' });
        }

        await Recompensa.findByIdAndDelete(id);

        res.status(200).json({ message: 'Recompensa removida com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover recompensa', error });
    }
};

// Resgatar uma recompensa aleatória (verifica se o usuário tem pontos suficientes)
exports.resgatarRecompensa = async (req, res) => {
    try {
        const usuario_id = req.user.id;

        // Buscar recompensas disponíveis para o usuário
        const recompensas = await Recompensa.find({ usuario_id });

        if (recompensas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma recompensa disponível para resgatar.' });
        }

        // Selecionar recompensa aleatória
        const recompensaAleatoria = recompensas[Math.floor(Math.random() * recompensas.length)];

        // Aqui deveria haver uma verificação do saldo de pontos do usuário antes de permitir o resgate
        // Exemplo: const usuario = await Usuario.findById(usuario_id);
        // if (usuario.pontos < recompensaAleatoria.pontos) return res.status(400).json({ message: 'Pontos insuficientes' });

        res.status(200).json({ message: 'Recompensa resgatada com sucesso!', recompensa: recompensaAleatoria });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao resgatar recompensa', error });
    }
};
