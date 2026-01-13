import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../services/authService';
import '../../styles/auth.css';

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
            <form className="card p-4" style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleRegister}>
                <h2 className="text-center mb-4">Registrar</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <div className="form-group">
                    <label>Nome de Usuário</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite seu nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Confirmar Senha</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirme sua senha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Registrar</button>
                <button type="button" onClick={handleVoltarHome} className="btn btn-secondary btn-block mt-2">
                    Voltar para Home
                </button>
            </form>
        </div>
    );
};

export default Register;
