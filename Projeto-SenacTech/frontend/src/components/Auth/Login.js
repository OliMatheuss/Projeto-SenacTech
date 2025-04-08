import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../services/authService';
import AuthContext from '../../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
    
        try {
            const response = await authService.login(email, senha);
            login(response.user);
            history.push('/dashboard');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao fazer login';
            console.error('Erro ao fazer login:', errorMessage);
            setError(errorMessage);
        }
    };

    const handleVoltarHome = () => {
        history.push('/');
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            <button onClick={handleVoltarHome} style={{ marginTop: '10px' }}>
                Voltar para Home
            </button>
        </div>
    );
};

export default Login;
