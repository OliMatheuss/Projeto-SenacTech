import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user, fetchUserFromAPI, logout } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        fetchUserFromAPI();
    }, []);

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <div className="page-container">
            <div className="card">
                <h1>Bem-vindo</h1>
                {user ? (
                    <div style={{ marginBottom: '20px' }}>
                        <p><strong>Nome:</strong> {user.username || 'Usuário'}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Pontos:</strong> {user.pontos || 0}</p>
                        <p><strong>Data de Criação:</strong> {new Date(user.data_criacao).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <p>Carregando dados do usuário...</p>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                    <button onClick={() => history.push('/criar-missao')} className="btn btn-info w-100">
                        Criar Missão
                    </button>
                    <button onClick={() => history.push('/listar-missoes')} className="btn btn-warning w-100">
                        Listar Missões
                    </button>
                    <button onClick={() => history.push('/criar-recompensa')} className="btn btn-danger w-100">
                        Criar Recompensa
                    </button>
                    <button onClick={() => history.push('/listar-recompensas')} className="btn btn-dark w-100">
                        Listar Recompensas
                    </button>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary w-100">
                    Sair
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
