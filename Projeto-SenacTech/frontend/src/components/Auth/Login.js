import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Serviço de autenticação
import authService from '../../services/authService';

// Contexto de autenticação
import AuthContext from '../../contexts/AuthContext';

// Estilos da tela de autenticação
import '../../styles/auth.css';

const Login = () => {
    // Estados dos campos do formulário
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // Estado para mensagens de erro
    const [error, setError] = useState('');

    // Hook para navegação
    const history = useHistory();

    // Função de login vinda do contexto
    const { login } = useContext(AuthContext);

    // Envio do formulário de login
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação: campos obrigatórios
        if (!email || !senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Chamada ao serviço de login
            const response = await authService.login(email, senha);
            const { user, token } = response;

            // Salva usuário e token no contexto
            login(user, token);

            // Redireciona para o dashboard
            history.push('/dashboard');
        } catch (error) {
            // Tratamento de erro da API
            const errorMessage =
                error.response?.data?.message || 'Erro ao fazer login.';

            console.error('Erro ao fazer login:', errorMessage);
            setError(errorMessage);
        }
    };

    // Navegação para a Home
    const handleVoltarHome = () => {
        history.push('/');
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <form
                className="card p-4"
                style={{ width: '100%', maxWidth: '400px' }}
                onSubmit={handleSubmit}
            >
                <h2 className="text-center mb-4">Login</h2>

                {/* Exibição de mensagem de erro */}
                {error && (
                    <p className="text-danger text-center">
                        {error}
                    </p>
                )}

                <div className="form-group">
                    <label style={{ color: '#c9b713' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label style={{ color: '#c9b713' }}>
                        Senha
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                >
                    Entrar
                </button>

                <button
                    type="button"
                    onClick={handleVoltarHome}
                    className="btn btn-secondary btn-block mt-2"
                >
                    Voltar para Home
                </button>
            </form>
        </div>
    );
};

export default Login;
