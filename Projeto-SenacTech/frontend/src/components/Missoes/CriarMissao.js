import React, { useState } from 'react';
import missoesService from '../../../services/missoesService';

const CriarMissao = () => {
    const [descricao, setDescricao] = useState('');
    const [valorDaMissao, setValorDaMissao] = useState(100);
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await missoesService.criarMissao({ descricao, valor_da_missao: valorDaMissao });
            setMensagem('Missão criada com sucesso!');
            setDescricao('');
            setValorDaMissao(100);
        } catch (error) {
            setMensagem('Erro ao criar missão. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Criar Missão</h2>
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
                <div>
                    <label>Valor da Missão:</label>
                    <input
                        type="number"
                        value={valorDaMissao}
                        onChange={(e) => setValorDaMissao(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Criar Missão</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
};

export default CriarMissao;