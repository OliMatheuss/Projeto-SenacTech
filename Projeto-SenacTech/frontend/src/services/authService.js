// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = async (username, email, senha) => { // Alterado para "senha"
    try {
        console.log('Dados enviados para registro:', { username, email, senha });
        const response = await axios.post(API_URL + 'register', {
            username,
            email,
            senha, // Enviando "senha" em vez de "password"
        });
        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error.response?.data || error.message);
        throw error;
    }
};
const login = async (email, senha) => {
    try {
        const response = await axios.post(API_URL + 'login', { email, senha });
        console.log('Resposta da API:', response.data); // Verifique o que está sendo retornado

        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Salva o token
            localStorage.setItem('usuario_id', response.data.user.id); // Salva apenas o ID do usuário
        }

        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error.response?.data || error.message);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};