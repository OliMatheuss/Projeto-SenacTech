import axios from 'axios';
import { getAuthHeaders } from './utils/auth'; // Função centralizada para obter cabeçalhos de autenticação

const API_URL = 'http://localhost:5000/api/recompensa';

const recompensaService ={
criarRecompensa: async (descricao, pontos) => {
    try {
        const response = await axios.post(
            API_URL,
            { descricao, pontos },
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao criar recompensa';
    }
},

// Listar recompensas do usuário autenticado
  listarRecompensas: async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao listar recompensas';
    }
},

// Remover uma recompensa
 removerRecompensa: async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao remover recompensa';
    }
},

// Resgatar uma recompensa aleatória
 resgatarRecompensa:async () => {
    try {
        const response = await axios.post(`${API_URL}/resgatar`, {}, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao resgatar recompensa';
    }
}
};
export default recompensaService;
