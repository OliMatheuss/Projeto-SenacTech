import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // URL base da API
});

// Funções de autenticação
export const registerUser = async (userData) => {
    return await api.post('/auth/register', userData);
};

export const loginUser = async (credentials) => {
    return await api.post('/auth/login', credentials);
};

// Funções de usuários
export const getUserInfo = async (userId) => {
    return await api.get(`/usuarios/${userId}`);
};

export const updateUserPoints = async (userId, points) => {
    return await api.patch(`/usuarios/${userId}/pontos`, { pontos: points });
};

// Funções de missões
export const createMission = async (missionData) => {
    return await api.post('/missoes', missionData);
};

export const getUserMissions = async (userId) => {
    return await api.get(`/missoes/${userId}`);
};

export const deleteMission = async (missionId) => {
    return await api.delete(`/missoes/${missionId}`);
};

// Funções de recompensas
export const createReward = async (rewardData) => {
    return await api.post('/recompensa', rewardData);
};

export const getUserRewards = async (userId) => {
    return await api.get(`/recompensa/${userId}`);
};

export const deleteReward = async (rewardId) => {
    return await api.delete(`/recompensa/${rewardId}`);
};

export const redeemReward = async () => {
    return await api.post('/recompensa/resgatar');
};