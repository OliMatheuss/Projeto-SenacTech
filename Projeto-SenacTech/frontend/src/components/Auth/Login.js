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
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="page-title">Login</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>

                <button
                    onClick={handleVoltarHome}
                    className="btn btn-secondary w-100 mt-3"
                >
                    Voltar para Home
                </button>
            </div>
        </div>
    );
};

export default Login;
