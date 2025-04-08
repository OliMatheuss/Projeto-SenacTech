import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { criarRecompensa } from '../../services/recompensaService';

const CriarRecompensa = () => {
    const [descricao, setDescricao] = useState('');
    const [pontos, setPontos] = useState(0); // Novo estado para os pontos
    const [mensagem, setMensagem] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await criarRecompensa(descricao, pontos); // Correto agora 
            setMensagem('Recompensa criada com sucesso!');
            setDescricao('');
            setPontos(0);
        } catch (error) {
            setMensagem(error.message || 'Erro ao criar recompensa. Tente novamente.');
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
                <div>
                    <label>Pontos necessários:</label>
                    <input
                        type="number"
                        value={pontos}
                        onChange={(e) => setPontos(parseInt(e.target.value, 10) || 0)}
                        min="0"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-outline-success">
                    Criar
                </button>
            </form>
            {mensagem && <p>{mensagem}</p>}
            <button onClick={() => history.push('/dashboard')} className="btn btn-outline-primary" style={{ marginTop: '20px' }}>
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default CriarRecompensa;
