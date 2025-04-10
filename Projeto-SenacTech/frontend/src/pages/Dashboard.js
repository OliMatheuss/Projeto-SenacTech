import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user, fetchUserFromAPI, logout } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        fetchUserFromAPI(); // força o refresh dos dados
    }, []);

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Bem-vindo</h2>

                {user ? (
                    <div className="mb-4">
                        <p><strong>Nome:</strong> {user.username || 'Usuário'}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Pontos:</strong> {user.pontos || 0}</p>
                        <p><strong>Data de Criação:</strong> {new Date(user.data_criacao).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <p>Carregando dados do usuário...</p>
                )}

                <div className="row g-2 mb-3">
                    <div className="col-6">
                        <button onClick={() => history.push('/criar-missao')} className="btn btn-outline-info w-100">
                            Criar Missão
                        </button>
                    </div>
                    <div className="col-6">
                        <button onClick={() => history.push('/listar-missoes')} className="btn btn-outline-warning w-100">
                            Listar Missões
                        </button>
                    </div>
                    <div className="col-6">
                        <button onClick={() => history.push('/criar-recompensa')} className="btn btn-outline-danger w-100">
                            Criar Recompensa
                        </button>
                    </div>
                    <div className="col-6">
                        <button onClick={() => history.push('/listar-recompensas')} className="btn btn-outline-dark w-100">
                            Listar Recompensas
                        </button>
                    </div>
                </div>

                <button onClick={handleLogout} className="btn btn-outline-secondary w-100">
                    Sair
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
