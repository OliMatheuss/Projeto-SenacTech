import axios from 'axios';
import { getAuthHeaders } from './utils/auth'; // Função centralizada para obter cabeçalhos de autenticação

// Define a URL base para as requisições relacionadas a missões
const API_URL = 'http://localhost:5000/api/missoes';

const missoesService = {
    // Função para criar uma nova missão
    criarMissao: async (missaoData) => {
        try {
            // Verificar se os dados necessários estão presentes
            if (!missaoData.descricao || !missaoData.valor_da_missao) {
                throw new Error('Descrição e pontos de recompensa são obrigatórios!');
            }

            const response = await axios.post(API_URL, missaoData, {
                headers: getAuthHeaders()
            });

            return response.data; // Retorna os dados da resposta
        } catch (error) {
            console.error('Erro ao criar missão:', error.response?.data || error.message); // Log detalhado de erro
            throw error.response?.data || 'Erro ao criar missão'; // Lança o erro com os dados da resposta da API
        }
    },

    // Função para listar as missões de um usuário específico
    listarMissoes: async () => {
        try {
            const usuarioId = localStorage.getItem('usuario_id'); // Obtém o ID do usuário do localStorage

            if (!usuarioId) {
                throw new Error('ID do usuário não encontrado no localStorage');
            }

            const response = await axios.get(`${API_URL}/${usuarioId}`, {
                headers: getAuthHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Erro na requisição:', {
                url: `${API_URL}/${usuarioId}`,
                error: error.response?.data || error.message
            });
            throw new Error(error.response?.data?.message || 'Erro ao listar missões');
        }
    },

    // Função para remover uma missão específica
    removerMissao: async (missaoId) => {
        try {
            const response = await axios.delete(`${API_URL}/${missaoId}`, {
                headers: getAuthHeaders()
            });
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            console.error('Erro ao remover missão:', error.response?.data || error.message); // Log detalhado de erro
            throw error.response?.data || 'Erro ao remover missão'; // Lança o erro com os dados da resposta da API
        }
    },
    

    // Função para concluir uma missão (excluir + atualizar pontos)
    concluirMissao: async (missaoId) => {
        try {
            const response = await axios.put(`${API_URL}/concluir/${missaoId}`, {}, {
                headers: getAuthHeaders()
            });
    
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            console.error('Erro ao concluir missão:', error.response?.data || error.message);
            throw error.response?.data || 'Erro ao concluir missão';
        }
    }
};

export default missoesService; // Exporta o serviço para ser utilizado em outros arquivos
