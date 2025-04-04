import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recompensa';

// Obtendo o token do localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

// Criar uma nova recompensa
const criarRecompensa = async (descricao, pontos) => {
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
};

// Listar recompensas do usuário autenticado
const listarRecompensas = async () => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao listar recompensas';
    }
};

// Remover uma recompensa
const removerRecompensa = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao remover recompensa';
    }
};

// Resgatar uma recompensa aleatória
const resgatarRecompensa = async () => {
    try {
        const response = await axios.post(`${API_URL}/resgatar`, {}, { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erro ao resgatar recompensa';
    }
};

export { criarRecompensa, listarRecompensas, removerRecompensa, resgatarRecompensa };
