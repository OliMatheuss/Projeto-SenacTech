import React, { useState } from 'react';
import { criarRecompensa } from '../../services/recompensaService';

const CriarRecompensa = () => {
    const [descricao, setDescricao] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await criarRecompensa({ descricao });
            setMensagem('Recompensa criada com sucesso!');
            setDescricao('');
        } catch (error) {
            setMensagem('Erro ao criar recompensa. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Criar Recompensa</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Criar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default CriarRecompensa;