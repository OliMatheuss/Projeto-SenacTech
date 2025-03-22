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
            const response = await axios.get(`${API_URL}/${usuarioId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
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