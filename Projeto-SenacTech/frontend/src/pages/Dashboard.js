import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext); // Obtém os dados do usuário do contexto
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login'); // Redireciona para a página de login após o logout
    };

    return (
        <div>
            <h1>Bem-vindo ao Dashboard</h1>
            {user ? ( // Exibe os dados do usuário se ele estiver logado
                <div style={{ marginBottom: '20px' }}>
                    <p><strong>Nome:</strong> {user.username || 'Usuário'}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Pontos:</strong> {user.pontos || 0}</p>
                    <p><strong>Status:</strong> {user.status}</p>
                    <p><strong>Data de Criação:</strong> {new Date(user.data_criacao).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Carregando dados do usuário...</p> // Mensagem enquanto os dados do usuário são carregados
            )}
            <div>
                <button onClick={() => history.push('/resgatar-recompensa')}>Resgatar Recompensa</button>
                <button onClick={() => history.push('/criar-missao')}>Criar Missão</button>
                <button onClick={() => history.push('/listar-missoes')}>Listar Missões</button>
                <button onClick={() => history.push('/criar-recompensa')}>Criar Recompensa</button>
                <button onClick={() => history.push('/listar-recompensas')}>Listar Recompensas</button>
            </div>
            <button onClick={handleLogout} style={{ marginTop: '20px' }}>Sair</button>
        </div>
    );
};

export default Dashboard;