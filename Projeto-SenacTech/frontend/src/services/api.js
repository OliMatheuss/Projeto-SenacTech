import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Cria uma instância do axios com a URL base da API
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Define o endereço base para todas as requisições
});

// Funções de autenticação

// Registra um novo usuário enviando os dados para a API
export const registerUser = async (userData) => {
    return await api.post('/auth/register', userData);
};

// Faz login do usuário enviando as credenciais para a API
export const loginUser = async (credentials) => {
    return await api.post('/auth/login', credentials);
};

// Funções relacionadas aos usuários

// Obtém as informações de um usuário com base no ID
export const getUserInfo = async (userId) => {
    return await api.get(`/usuarios/${userId}`);
};

// Atualiza os pontos de um usuário enviando o novo valor para a API
export const updateUserPoints = async (userId, points) => {
    return await api.patch(`/usuarios/${userId}/pontos`, { pontos: points });
};

// Funções relacionadas às missões

// Cria uma nova missão enviando os dados para a API
export const createMission = async (missionData) => {
    return await api.post('/missoes', missionData);
};

// Obtém as missões associadas a um usuário
export const getUserMissions = async (userId) => {
    return await api.get(`/missoes/${userId}`);
};

// Deleta uma missão específica com base no ID
export const deleteMission = async (missionId) => {
    return await api.delete(`/missoes/${missionId}`);
};

// Funções relacionadas às recompensas

// Cria uma nova recompensa enviando os dados para a API
export const createReward = async (rewardData) => {
    return await api.post('/recompensa', rewardData);
};

// Obtém as recompensas associadas a um usuário
export const getUserRewards = async (userId) => {
    return await api.get(`/recompensa/${userId}`);
};

// Deleta uma recompensa específica com base no ID
export const deleteReward = async (rewardId) => {
    return await api.delete(`/recompensa/${rewardId}`);
};

// Resgata uma recompensa
export const redeemReward = async () => {
    return await api.post('/recompensa/resgatar');
};
