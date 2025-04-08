import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importação do useHistory
import authService from '../../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const history = useHistory(); // Inicialização do useHistory

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !senha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        try {
            const data = await authService.register(username, email, senha);
            console.log('Registro bem-sucedido:', data);
            alert('Usuário registrado com sucesso!');
            history.push('/login'); // Redireciona para a página de login
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
        <div>
            <h2>Registrar</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nome de Usuário:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <label>Confirmar Senha:</label>
                    <input
                        type="password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
            <button onClick={handleVoltarHome} style={{ marginTop: '10px' }}>
                Voltar para Home
            </button>
        </div>
    );
};

export default Register;