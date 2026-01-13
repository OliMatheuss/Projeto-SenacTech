import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { resgatarRecompensa } from '../services/recompensaService';
import '../styles/resgatarRecompensa.css';

const ResgatarRecompensa = () => {
    const [mensagem, setMensagem] = useState('');
    const history = useHistory();

    const handleResgatar = async () => {
        try {
            const { mensagem } = await resgatarRecompensa();
            setMensagem(mensagem);
        } catch {
            setMensagem('Erro ao resgatar recompensa. Tente novamente.');
        }
    };

    return (
        <div className="page-container">
            <div className="card">
                <h1>Resgatar Recompensa</h1>
                <button onClick={handleResgatar} className="btn btn-outline-success">
                    Resgatar Recompensa Aleatória
                </button>
                {mensagem && (
                    <p style={{ color: mensagem.includes('Erro') ? '#e74c3c' : '#28a745' }}>
                        {mensagem}
                    </p>
                )}
                <button
                    onClick={() => history.push('/dashboard')}
                    className="btn btn-outline-primary"
                    style={{ marginTop: '20px' }}
                >
                    Voltar para o Dashboard
                </button>
            </div>
        </div>
    );
};

export default ResgatarRecompensa;