import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !senha || !confirmarSenha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            setError('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        try {
            const data = await authService.register(username, email, senha);
            console.log('Registro bem-sucedido:', data);
            alert('Usuário registrado com sucesso!');
            history.push('/login');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao registrar usuário';
            console.error('Erro ao registrar:', errorMessage);
            setError(errorMessage);
        }
    };

    const handleVoltarHome = () => {
        history.push('/');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <h2 className="text-center mb-4">Registrar</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label">Nome de Usuário:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirmar Senha:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Registrar
                    </button>
                </form>

                <button
                    onClick={handleVoltarHome}
                    className="btn btn-outline-secondary w-100 mt-3"
                >
                    Voltar para Home
                </button>
            </div>
        </div>
    );
};

export default Register;
