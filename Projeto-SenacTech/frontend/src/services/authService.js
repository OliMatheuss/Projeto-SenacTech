// src/services/authService.js
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Define a URL base para as requisições relacionadas à autenticação
const API_URL = 'http://localhost:5000/api/auth/';

// Função para registrar um novo usuário
const register = async (username, email, senha) => { // Alterado para "senha" no lugar de "password"
    try {
        console.log('Dados enviados para registro:', { username, email, senha }); // Log dos dados enviados
        // Envia uma requisição POST para registrar o usuário
        const response = await axios.post(API_URL + 'register', {
            username,
            email,
            senha, // Utilizando "senha" no lugar de "password"
        });
        return response.data; // Retorna os dados da resposta da API
    } catch (error) {
        console.error('Erro na requisição:', error.response?.data || error.message); // Log de erro detalhado
        throw error; // Lança o erro para ser tratado externamente
    }
};

// Função para login do usuário
const login = async (email, senha) => {
    try {
        // Envia uma requisição POST para autenticação do usuário
        const response = await axios.post(API_URL + 'login', {
            email,
            senha,
        });
        console.log('Resposta da API:', response.data); // Log da resposta da API para depuração
        
        // Se a resposta contiver um token, armazena os dados do usuário no localStorage
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data; // Retorna os dados da resposta da API
    } catch (error) {
        console.error('Erro na requisição:', error.response?.data || error.message); // Log de erro detalhado
        throw error; // Lança o erro para ser tratado externamente
    }
};

// Função para logout do usuário
const logout = () => {
    localStorage.removeItem('user'); // Remove os dados do usuário do localStorage
};

// Função para obter o usuário atualmente autenticado
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user')); // Retorna os dados do usuário armazenados no localStorage
};

// Exporta as funções para serem utilizadas em outros arquivos
export default {
    register,
    login,
    logout,
    getCurrentUser,
};
