import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login'); // Redireciona para a página de login após o logout
    };

    return (
        <div>
            <h1>Bem-vindo ao Dashboard</h1>
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