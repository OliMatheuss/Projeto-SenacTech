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
            const data = await authService.login(email, senha);
            login(data); // Salva o estado do usuário no contexto
            history.push('/dashboard');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao fazer login';
            console.error('Erro ao fazer login:', errorMessage);
            setError(errorMessage);
        }
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
        </div>
    );
};

export default Login;