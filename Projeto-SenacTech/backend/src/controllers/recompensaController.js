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

        resgatarRecompensa: async (req, res) => {
        const usuario_id = req.user.id;
        const { id } = req.params;

        try {
            const recompensa = await Recompensa.findByIdAndUsuarioId(id, usuario_id);

            if (!recompensa) {
                return res.status(404).json({ message: 'Recompensa não encontrada.' });
            }

            const pontosUsuario = await Usuario.findById(usuario_id);

            if (!pontosUsuario || pontosUsuario.pontos < recompensa.pontos_necessarios) {
                return res.status(400).json({ message: 'Pontos insuficientes para resgatar a recompensa.' });
            }

            const novosPontos = pontosUsuario.pontos - recompensa.pontos_necessarios;
            await Usuario.atualizarPontos(usuario_id, novosPontos);

            await Recompensa.delete(id);

            return res.status(200).json({ message: 'Recompensa resgatada com sucesso!' });
        } catch (error) {
            console.error('Erro ao resgatar recompensa:', error);
            return res.status(500).json({ message: 'Erro ao resgatar recompensa' });
        }
    },

    removerRecompensa: async (req, res) => {
        const usuario_id = req.user.id;
        const { id } = req.params;

        try {
            const recompensa = await Recompensa.findByIdAndUsuarioId(id, usuario_id);

            if (!recompensa) {
                return res.status(404).json({ message: 'Recompensa não encontrada ou não pertence ao usuário.' });
            }

            await Recompensa.delete(id);

            return res.status(200).json({ message: 'Recompensa removida com sucesso.' });
        } catch (error) {
            console.error('Erro ao remover recompensa:', error);
            return res.status(500).json({ message: 'Erro ao remover recompensa' });
        }
    }
};

module.exports = recompensaController;