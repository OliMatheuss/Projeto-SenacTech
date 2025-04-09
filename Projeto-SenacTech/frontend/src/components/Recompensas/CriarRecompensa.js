import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { criarRecompensa } from '../../services/recompensaService';

const CriarRecompensa = () => {
    const [descricao, setDescricao] = useState('');
    const [pontos, setPontos] = useState(0);
    const [mensagem, setMensagem] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (mensagem === 'Recompensa criada com sucesso!') {
            const timer = setTimeout(() => setMensagem(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [mensagem]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!descricao.trim() || pontos <= 0) {
            setMensagem('Por favor, preencha uma descrição e pontos maiores que zero.');
            return;
        }

        try {
            await criarRecompensa(descricao, pontos);
            setMensagem('Recompensa criada com sucesso!');
            setDescricao('');
            setPontos(0);
        } catch (error) {
            setMensagem(error.message || 'Erro ao criar recompensa. Tente novamente.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4 text-center">Criar Recompensa</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Descrição:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: Vale-presente, Dia de folga..."
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pontos necessários:</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ex: 150"
                        value={pontos}
                        onChange={(e) => setPontos(parseInt(e.target.value, 10) || 0)}
                        min="1"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">Criar Recompensa</button>
            </form>

            {mensagem && (
                <div className="alert mt-3" style={{ color: mensagem.includes('sucesso') ? 'green' : 'red' }}>
                    {mensagem}
                </div>
            )}

            <button
                onClick={() => history.push('/dashboard')}
                className="btn btn-primary w-100 mt-3"
            >
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default CriarRecompensa;
