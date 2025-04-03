import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Define a URL base para as requisições relacionadas a missões
const API_URL = 'http://localhost:5000/api/missoes';

const missoesService = {
    // Função para criar uma nova missão
    criarMissao: async (missaoData) => {
        try {
            const token = localStorage.getItem('token'); // Pegando o token do localStorage
            
            if (!token) {
                throw new Error('Token de autenticação não encontrado');
            }

            // Verificar se os dados necessários estão presentes
            if (!missaoData.descricao || !missaoData.valor_da_missao) {
                throw new Error('Descrição e pontos de recompensa são obrigatórios!');
            }

            const response = await axios.post(API_URL, missaoData, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviando o token no cabeçalho
                }
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
            const token = localStorage.getItem('token'); 
            const usuarioId = localStorage.getItem('usuario_id'); 

            if (!usuarioId) {
                throw new Error('ID do usuário não encontrado no localStorage');
            }

            const response = await axios.get(`${API_URL}/${usuarioId}`, {  
                headers: {
                    Authorization: `Bearer ${token}` 
                }
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
            const token = localStorage.getItem('token'); // Pegando o token do localStorage
            const response = await axios.delete(`${API_URL}/${missaoId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Enviando o token no cabeçalho
                }
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
            const token = localStorage.getItem('token'); 
            const response = await axios.put(`${API_URL}/concluir/${missaoId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            console.error('Erro ao concluir missão:', error.response?.data || error.message);
            throw error.response?.data || 'Erro ao concluir missão';
        }
    }
};

export default missoesService; // Exporta o serviço para ser utilizado em outros arquivos
