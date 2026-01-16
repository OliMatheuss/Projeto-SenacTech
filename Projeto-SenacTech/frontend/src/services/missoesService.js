import axios from 'axios';
import { getAuthHeaders } from './utils/auth';

const API_URL = 'http://localhost:5000/api/missoes';

const missoesService = {
    listarMissoes: async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            throw new Error('Usuário não encontrado');
        }

        const response = await axios.get(
            `${API_URL}/${user.id}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    },

    criarMissao: async (missaoData) => {
        const response = await axios.post(
            API_URL,
            missaoData,
            { headers: getAuthHeaders() }
        );
        return response.data;
    },

    concluirMissao: async (missaoId) => {
        const response = await axios.put(
            `${API_URL}/concluir/${missaoId}`,
            {},
            { headers: getAuthHeaders() }
        );
        return response.data;
    },

    removerMissao: async (missaoId) => {
        const response = await axios.delete(
            `${API_URL}/${missaoId}`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    }
};

export default missoesService;
