import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import missoesService from '../../services/missoesService';

const CriarMissao = () => {
    const [descricao, setDescricao] = useState('');
    const [mensagem, setMensagem] = useState('');
    const history = useHistory();
    const usuario_id = localStorage.getItem('usuario_id');

    useEffect(() => {
        if (mensagem === 'Missão criada com sucesso!') {
            const timer = setTimeout(() => setMensagem(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [mensagem]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usuario_id) {
            setMensagem('Erro: Usuário não identificado. Faça login novamente.');
            return;
        }

        if (!descricao.trim()) {
            setMensagem('Erro: A descrição da missão é obrigatória.');
            return;
        }

        try {
            await missoesService.criarMissao({
                usuario_id: Number(usuario_id),
                descricao,
                valor_da_missao: 100
            });

            setMensagem('Missão criada com sucesso!');
            setDescricao('');
        } catch (error) {
            setMensagem('Erro ao criar missão. Tente novamente.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="page-title mb-4">Criar Missão</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Descrição da Missão:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite a missão..."
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3 d-flex flex-column align-items-center">
    <label className="form-label text-warning fw-bold" style={{ fontSize: '1rem' }}>
        Pontos da Missão:
    </label>
    <div className="input-group shadow-sm" style={{ width: '160px' }}>
        <input
            type="number"
            className="form-control text-center fw-bold"
            value={100}
            disabled
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
            className="input-group-text bg-white"
            style={{
                border: '2px solid #c2a318',
                borderLeft: 'none',
                borderRadius: '0 8px 8px 0',
            }}
        >
            <img
                src="/assets/icons/coin.svg"
                alt="coin"
                style={{ width: '24px', height: '24px' }}
            />
        </span>
    </div>
</div>

                <button type="submit" className="btn btn-success w-100">Criar Missão</button>
            </form>

            {mensagem && (
                <div
                    className="alert mt-3"
                    style={{ color: mensagem.includes('sucesso') ? 'green' : 'red' }}
                >
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

export default CriarMissao;
