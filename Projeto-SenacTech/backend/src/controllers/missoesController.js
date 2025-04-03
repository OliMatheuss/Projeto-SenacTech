const MissoesModel = require('../models/missoesModel');
const Usuario = require('../models/usuarioModel'); // Adicionando a importação correta

/**
 * Cria uma nova missão para o usuário logado
 */
const criarMissao = async (req, res) => {
    // Pega o ID do usuário do token JWT (autenticação)
    const usuario_id = req.user.id; 
    const { descricao, pontos_recompensa = 100, data_conclusao = null } = req.body;

    console.log(`Criando missão para usuário ${usuario_id}`, { usuario_id, descricao, pontos_recompensa, data_conclusao });

    if (!descricao) {
        return res.status(400).json({ 
            success: false,
            message: 'A descrição da missão é obrigatória!'
        });
    }

    try {
        // Chamada corrigida: passar os argumentos diretamente, e não um objeto
        const missaoCriada = await MissoesModel.create(usuario_id, descricao, pontos_recompensa, data_conclusao, 0);

        res.status(201).json({
            success: true,
            data: missaoCriada,
            message: 'Missão criada com sucesso!'
        });

    } catch (error) {
        console.error('Erro ao criar missão:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno ao criar missão',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};



/**
 * Lista todas as missões do usuário logado
 */
const listarMissoes = async (req, res) => {
    try {
        console.log('Parâmetro recebido:', req.params);  // Verifica se o parâmetro está vindo corretamente

        const { id } = req.params;  // Pega o ID do usuário da URL
        if (!id) {
            return res.status(400).json({ message: "ID do usuário é obrigatório" });
        }

        // Chama a função findByUserId que foi definida no modelo
        const missoes = await MissoesModel.findByUserId(id);

        if (!missoes || missoes.length === 0) {
            return res.status(404).json({ message: 'Nenhuma missão encontrada para esse usuário' });
        }

        res.status(200).json(missoes); // Retorna as missões encontradas
    } catch (error) {
        console.error('Erro no controller:', error);
        res.status(500).json({ message: 'Erro ao listar missões' });
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
const concluirMissao = async (req, res) => {
    const usuario_id = req.user.id; // ID do usuário autenticado
    const { id } = req.params; // ID da missão

    try {
        // Busca a missão para obter os pontos
        const missoes = await MissoesModel.findByUserId(usuario_id);
        const missaoEncontrada = missoes.find(m => m.id === parseInt(id));

        if (!missaoEncontrada) {
            return res.status(404).json({
                success: false,
                message: 'Missão não encontrada ou não pertence ao usuário'
            });
        }

        const pontosMissao = missaoEncontrada.pontos_recompensa;

        // Atualiza os pontos do usuário
        await Usuario.adicionarPontos(usuario_id, pontosMissao);

        // Exclui a missão após a conclusão
        const resultado = await MissoesModel.delete(id);

        if (resultado === 0) {
            return res.status(400).json({
                success: false,
                message: 'Erro ao concluir missão'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Missão concluída e pontos adicionados com sucesso'
        });

    } catch (error) {
        console.error('Erro ao concluir missão:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao concluir missão'
        });
    }
};





module.exports = {
    criarMissao,
    listarMissoes,
    removerMissao,
    concluirMissao
};