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
            <h1>Bem-vindo </h1>
            {user ? ( // Exibe os dados do usuário se ele estiver logado
                <div style={{ marginBottom: '20px' }}>
                    <p><strong>Nome:</strong> {user.username || 'Usuário'}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Pontos:</strong> {user.pontos || 0}</p>
                    <p><strong>Data de Criação:</strong> {new Date(user.data_criacao).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Carregando dados do usuário...</p> // Mensagem enquanto os dados do usuário são carregados
            )}
            <div>
                <button onClick={() => history.push('/criar-missao')} className="btn btn-outline-info">
                    Criar Missão
                </button>
                <button onClick={() => history.push('/listar-missoes')} className="btn btn-outline-warning">
                    Listar Missões
                </button>
                <button onClick={() => history.push('/criar-recompensa')} className="btn btn-outline-danger">
                    Criar Recompensa
                </button>
                <button onClick={() => history.push('/listar-recompensas')} className="btn btn-outline-dark">
                    Listar Recompensas
                </button>
            </div>
            <button onClick={handleLogout} className="btn btn-outline-secondary" style={{ marginTop: '20px' }}>
                Sair
            </button>
        </div>
    );
};

export default Dashboard;