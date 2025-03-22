import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recompensa';

const criarRecompensa = async (recompensaData) => {
    try {
        const response = await axios.post(API_URL, recompensaData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const listarRecompensas = async (usuarioId) => {
    try {
        const response = await axios.get(`${API_URL}/${usuarioId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const removerRecompensa = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

const resgatarRecompensa = async () => {
    try {
        const response = await axios.post(`${API_URL}/resgatar`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export { criarRecompensa, listarRecompensas, removerRecompensa, resgatarRecompensa };