// Função utilitária para obter os cabeçalhos de autenticação
// Centraliza a lógica de obtenção do token e montagem do cabeçalho
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token de autenticação não encontrado');
    }
    return { Authorization: `Bearer ${token}` };
};