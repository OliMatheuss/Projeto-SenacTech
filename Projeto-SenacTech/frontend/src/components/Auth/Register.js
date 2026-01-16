import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Serviço responsável pela autenticação (registro)
import authService from '../../services/authService';

// Estilos da tela de autenticação
import '../../styles/auth.css';

const Register = () => {
    // Estados dos campos do formulário
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // Estado para mensagens de erro
    const [error, setError] = useState('');

    // Hook para navegação entre rotas
    const history = useHistory();

    // Função responsável pelo registro do usuário
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validação: campos obrigatórios
        if (!username || !email || !senha || !confirmarSenha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        // Validação: confirmação de senha
        if (senha !== confirmarSenha) {
            setError('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        try {
            // Chamada ao serviço de registro
            const data = await authService.register(username, email, senha);
            console.log('Registro bem-sucedido:', data);

            alert('Usuário registrado com sucesso!');
            history.push('/login');
        } catch (error) {
            // Tratamento de erro vindo da API
            const errorMessage =
                error.response?.data?.message || 'Erro ao registrar usuário';

            console.error('Erro ao registrar:', errorMessage);
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
                onSubmit={handleRegister}
            >
                <h2 className="text-center mb-4">Registrar</h2>

                {/* Exibição de mensagem de erro */}
                {error && (
                    <p className="text-danger text-center">
                        {error}
                    </p>
                )}

                <div className="form-group">
                    <label style={{ color: '#c9b713' }}>
                        Nome de Usuário
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite seu nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

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

                <div className="form-group">
                    <label style={{ color: '#c9b713' }}>
                        Confirmar Senha
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirme sua senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                >
                    Registrar
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

export default Register;
