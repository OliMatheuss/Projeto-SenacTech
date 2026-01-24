const MissoesModel = require('../models/missoesModel');
const Usuario = require('../models/usuarioModel');

/**
 * Cria uma nova missão para o usuário logado
 */
const criarMissao = async (req, res) => {
    // Pega o ID do usuário do token JWT (autenticação)
    const usuario_id = req.user.id; 
    const { descricao, pontos_recompensa = 100 } = req.body;

    console.log(`Criando missão para usuário ${usuario_id}`, { usuario_id, descricao, pontos_recompensa });

    if (!descricao) {
        return res.status(400).json({ 
            success: false,
            message: 'A descrição da missão é obrigatória!'
        });
    }

    try {
        const missaoId = await MissoesModel.create(usuario_id, descricao, pontos_recompensa);
        return res.status(201).json({ message: 'Missão criada com sucesso', id: missaoId });
    } catch (error) {
        console.error('Erro ao criar missão:', error);
        return res.status(500).json({ message: 'Erro ao criar missão' });
    }
};



/**
 * Lista todas as missões do usuário logado
 */
const listarMissoes = async (req, res) => {
    const usuario_id = req.user.id;

    try {
        const missoes = await MissoesModel.findByUserId(usuario_id);
        return res.status(200).json(missoes);
    } catch (error) {
        console.error('Erro ao listar missões:', error);
        return res.status(500).json({ message: 'Erro ao listar missões' });
    }
};

/**
 * Remove uma missão do usuário logado
 */
const removerMissao = async (req, res) => {
    const usuario_id = req.user.id; // ID do usuário autenticado
    const { id } = req.params; // ID da missão

    try {
        // Verifica se a missão pertence ao usuário
        const missoes = await MissoesModel.findByUserId(usuario_id);
        const missaoEncontrada = missoes.find(m => m.id === parseInt(id));

        if (!missaoEncontrada) {
            return res.status(404).json({
                success: false,
                message: 'Missão não encontrada ou não pertence ao usuário'
            });
        }

        // Exclui a missão
        const resultado = await MissoesModel.delete(id);

        if (resultado === 0) {
            return res.status(400).json({
                success: false,
                message: 'Erro ao remover missão'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Missão removida com sucesso'
        });

    } catch (error) {
        console.error('Erro ao remover missão:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao remover missão'
        });
    }
};
// ...existing code...
const concluirMissao = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.user.id;

    try {
        const missao = await MissoesModel.findByIdAndUserId(id, usuario_id);

        if (!missao) {
            return res.status(404).json({ message: 'Missão não encontrada ou não pertence ao usuário.' });
        }

        await MissoesModel.concluir(id);
        await Usuario.adicionarPontos(missao.usuario_id, missao.pontos_recompensa);

        return res.status(200).json({ message: 'Missão concluída com sucesso!' });
    } catch (error) {
        console.error('Erro ao concluir missão:', error);
        return res.status(500).json({ message: 'Erro ao concluir missão' });
    }
};






module.exports = {
    criarMissao,
    listarMissoes,
    removerMissao,
    concluirMissao
};