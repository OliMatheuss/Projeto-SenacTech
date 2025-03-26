import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Define a URL base para as requisições relacionadas a missões
const API_URL = 'http://localhost:5000/api/missoes';

// Objeto contendo os métodos de serviço para missões
const missoesService = {
    // Função para criar uma nova missão
    criarMissao: async (missaoData) => {
        try {
            // Envia uma requisição POST para criar a missão
            const response = await axios.post(API_URL, missaoData);
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            throw error.response.data; // Lança um erro com os dados da resposta da API
        }
    },

    // Função para listar as missões de um usuário específico
    listarMissoes: async (usuarioId) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_URL}/usuario/${usuarioId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data;
        } catch (error) {
          console.error('Erro na requisição:', {
            url: `${API_URL}/usuario/${usuarioId}`,
            error: error.response?.data || error.message
          });
          throw new Error(error.response?.data?.message || 'Erro ao listar missões');
        }
      },

    // Função para remover uma missão específica
    removerMissao: async (missaoId) => {
        try {
            // Envia uma requisição DELETE para remover a missão com base no ID
            const response = await axios.delete(`${API_URL}/${missaoId}`);
            return response.data; // Retorna os dados da resposta
        } catch (error) {
            throw error.response.data; // Lança um erro com os dados da resposta da API
        }
    }
};

export default missoesService; // Exporta o serviço para ser utilizado em outros arquivos
