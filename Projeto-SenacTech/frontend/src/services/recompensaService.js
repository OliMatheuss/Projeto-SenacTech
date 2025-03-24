import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Define a URL base para as requisições relacionadas a recompensas
const API_URL = 'http://localhost:5000/api/recompensa';

// Função para criar uma nova recompensa
const criarRecompensa = async (recompensaData) => {
    try {
        // Envia uma requisição POST para criar a recompensa
        const response = await axios.post(API_URL, recompensaData);
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        throw error.response.data; // Lança um erro com os dados da resposta da API
    }
};

// Função para listar as recompensas de um usuário específico
const listarRecompensas = async (usuarioId) => {
    try {
        // Envia uma requisição GET para obter as recompensas do usuário
        const response = await axios.get(`${API_URL}/${usuarioId}`);
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        throw error.response.data; // Lança um erro com os dados da resposta da API
    }
};

// Função para remover uma recompensa específica
const removerRecompensa = async (id) => {
    try {
        // Envia uma requisição DELETE para remover a recompensa com base no ID
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        throw error.response.data; // Lança um erro com os dados da resposta da API
    }
};

// Função para resgatar uma recompensa
const resgatarRecompensa = async () => {
    try {
        // Envia uma requisição POST para resgatar a recompensa
        const response = await axios.post(`${API_URL}/resgatar`);
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        throw error.response.data; // Lança um erro com os dados da resposta da API
    }
};

// Exporta as funções para serem utilizadas em outros arquivos
export { criarRecompensa, listarRecompensas, removerRecompensa, resgatarRecompensa };