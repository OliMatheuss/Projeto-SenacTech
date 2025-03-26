import axios from 'axios';

const API_URL = 'http://localhost:5000/api/missoes';

const missoesService = {
    criarMissao: async (missaoData) => {
        try {
            const response = await axios.post(API_URL, missaoData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

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

    removerMissao: async (missaoId) => {
        try {
            const response = await axios.delete(`${API_URL}/${missaoId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default missoesService;