// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = async (username, email, password) => {
    const response = await axios.post(API_URL + 'register', {
        username,
        email,
        password,
    });
    return response.data;
};
const login = async (email, senha) => {
    try {
        const response = await axios.post(API_URL + 'login', {
            email,
            senha,
        });
        console.log('Resposta da API:', response.data); // Verifique o que está sendo retornado
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
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