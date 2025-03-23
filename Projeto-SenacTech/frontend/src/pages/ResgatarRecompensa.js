import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Importação do useHistory
import { resgatarRecompensa } from '../services/recompensaService';

const ResgatarRecompensa = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const history = useHistory(); // Inicialização do useHistory

    useEffect(() => {
        // Aqui você pode buscar as recompensas do usuário, se necessário
    }, []);

    const handleResgatar = async () => {
        try {
            const resposta = await resgatarRecompensa();
            setMensagem(resposta.mensagem);
        } catch (error) {
            setMensagem('Erro ao resgatar recompensa. Tente novamente.');
        }
    };

    return (
        <div>
            <h1>Resgatar Recompensa</h1>
            <button onClick={handleResgatar} className="btn btn-outline-success">
                Resgatar Recompensa Aleatória
            </button>
            {mensagem && <p>{mensagem}</p>}
            <button onClick={() => history.push('/dashboard')} className="btn btn-outline-primary" style={{ marginTop: '20px' }}>
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default ResgatarRecompensa;