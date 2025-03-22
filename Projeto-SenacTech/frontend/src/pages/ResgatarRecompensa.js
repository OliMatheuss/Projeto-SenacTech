import React, { useState, useEffect } from 'react';
import { resgatarRecompensa } from '../services/recompensaService';

const ResgatarRecompensa = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [mensagem, setMensagem] = useState('');

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
            <button onClick={handleResgatar}>Resgatar Recompensa Aleatória</button>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default ResgatarRecompensa;