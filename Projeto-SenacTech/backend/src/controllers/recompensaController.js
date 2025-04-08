const Recompensa = require('../models/recompensaModel');
const Usuario = require('../models/usuarioModel');

const recompensaController = {
    criarRecompensa: async (req, res) => {
        const usuario_id = req.user.id;
        const { descricao, pontos } = req.body;

        // Validação básica
        if (!descricao || pontos === undefined || pontos < 0) {
            return res.status(400).json({ message: 'Descrição e pontos são obrigatórios.' });
        }

        try {
            const recompensaId = await Recompensa.create(usuario_id, descricao, pontos);
            return res.status(201).json({ message: 'Recompensa criada com sucesso', id: recompensaId });
        } catch (error) {
            console.error('Erro ao criar recompensa:', error);
            return res.status(500).json({ message: 'Erro ao criar recompensa' });
        }
    },

    listarRecompensas: async (req, res) => {
        const usuario_id = req.user.id;

        try {
            const recompensas = await Recompensa.findByUsuarioId(usuario_id);
            return res.status(200).json(recompensas);
        } catch (error) {
            console.error('Erro ao listar recompensas:', error);
            return res.status(500).json({ message: 'Erro ao listar recompensas' });
        }
    },

    removerRecompensa: async (req, res) => {
        const usuario_id = req.user.id;
        const recompensaId = req.params.id;

        try {
            const recompensas = await Recompensa.findByUsuarioId(usuario_id);
            const recompensa = recompensas.find(r => r.id == recompensaId);

            if (!recompensa) {
                return res.status(403).json({ message: 'Você não tem permissão para remover esta recompensa' });
            }

            await Recompensa.delete(recompensaId);
            return res.status(200).json({ message: 'Recompensa removida com sucesso' });
        } catch (error) {
            console.error('Erro ao remover recompensa:', error);
            return res.status(500).json({ message: 'Erro ao remover recompensa' });
        }
    },

    resgatarRecompensa: async (req, res) => {
        const usuario_id = req.user.id;

        try {
            const recompensas = await Recompensa.findByUsuarioId(usuario_id);
            if (recompensas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma recompensa disponível para resgate' });
            }

            const recompensaAleatoria = recompensas[Math.floor(Math.random() * recompensas.length)];
            const pontosAtuais = await Usuario.getPontosUsuario(usuario_id);

            if (pontosAtuais < recompensaAleatoria.pontos) {
                return res.status(400).json({ message: 'Pontos insuficientes para resgatar esta recompensa' });
            }

            await Usuario.atualizarPontosUsuario(usuario_id, pontosAtuais - recompensaAleatoria.pontos);
            await Recompensa.delete(recompensaAleatoria.id);

            return res.status(200).json({ 
                message: 'Recompensa resgatada com sucesso', 
                recompensa: recompensaAleatoria 
            });
        } catch (error) {
            console.error('Erro ao resgatar recompensa:', error);
            return res.status(500).json({ message: 'Erro ao resgatar recompensa' });
        }
    }
};

module.exports = recompensaController;
