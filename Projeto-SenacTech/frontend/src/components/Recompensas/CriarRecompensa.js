import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { criarRecompensa } from '../../services/recompensaService';

const CriarRecompensa = () => {
    const [descricao, setDescricao] = useState('');
    const [pontos, setPontos] = useState(0);
    const [mensagem, setMensagem] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (mensagem) {
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
        <div className="page-container">
            <div className="card">
                <h1>Criar Recompensa</h1>

                {/* Mensagem de feedback */}
                {mensagem && (
                    <div
                        className={`alert ${mensagem.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}
                    >
                        {mensagem}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Campo de descrição */}
                    <div className="mb-3">
                        <label
    className="form-label fw-bold"
    style={{ color: '#c9b713' }} 
>Descrição: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: Vale-presente, Dia de folga..."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                            style={{
                                backgroundColor: '#fffce0',
                                color: '#c9b713',
                                fontWeight: 'bold',
                                border: '2px solid #c4b214',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                            }}
                        />
                    </div>

                    {/* Campo de pontos */}
                    <div className="mb-3 d-flex flex-column align-items-center">
                        <label className="form-label text-warning fw-bold">Pontos necessários:</label>
                        <div className="input-group shadow-sm" style={{ width: '160px' }}>
                            <input
                                type="number"
                                className="form-control text-center fw-bold"
                                placeholder="Ex: 150"
                                value={pontos}
                                onChange={(e) => setPontos(Number(e.target.value))}
                                min="1"
                                required
                                style={{
                                    backgroundColor: '#fffce0',
                                    color: '#c9b713',
                                    fontSize: '1.3rem',
                                    border: '2px solid #c4b214',
                                    borderRight: 'none',
                                    borderRadius: '8px 0 0 8px',
                                }}
                            />
                            <span
                                className="input-group-text"
                                style={{
                                    backgroundColor: '#c4b214',
                                    color: '#fff',
                                    border: '2px solid #c4b214',
                                    borderLeft: 'none',
                                    borderRadius: '0 8px 8px 0',
                                }}
                            >
                                <img
                                    src="/assets/icons/coin.svg"
                                    alt="coin"
                                    style={{ width: '20px', height: '20px' }}
                                />
                            </span>
                        </div>
                    </div>

                    {/* Botão de submissão */}
                    <button type="submit" className="btn btn-success w-100 mb-3">
                        Criar Recompensa
                    </button>
                </form>

                {/* Botão para voltar ao dashboard */}
                <button
                    onClick={() => history.push('/dashboard')}
                    className="btn btn-secondary w-100"
                >
                    Voltar para o Dashboard
                </button>
            </div>
        </div>
    );
};

export default CriarRecompensa;
