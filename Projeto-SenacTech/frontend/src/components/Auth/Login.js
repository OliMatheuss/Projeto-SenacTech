import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../services/authService';
import AuthContext from '../../contexts/AuthContext';
import "../../styles/auth.css";


const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await authService.login(email, senha);
            const { user, token } = response;

            login(user, token); // <-- agora com token também
            history.push('/dashboard');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao fazer login.';
            console.error('Erro ao fazer login:', errorMessage);
            setError(errorMessage);
        }
    };

    const handleVoltarHome = () => {
        history.push('/');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form className="card p-4" style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Login</h2>
                {error && <p className="text-danger text-center">{error}</p>}
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
                <button type="submit" className="btn btn-primary btn-block mt-3">Entrar</button>
                <button type="button" onClick={handleVoltarHome} className="btn btn-secondary btn-block mt-2">
                    Voltar para Home
                </button>
            </form>
        </div>
    );
};

export default Login;
