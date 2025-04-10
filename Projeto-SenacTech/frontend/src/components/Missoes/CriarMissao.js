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
            const timer = setTimeout(() => setMensagem(''), 3000); // limpa a mensagem após 3s
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
                valor_da_missao: 100 // valor fixo
            });

            setMensagem('Missão criada com sucesso!');
            setDescricao('');
        } catch (error) {
            setMensagem('Erro ao criar missão. Tente novamente.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="page-title">Criar Missão</h2>
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
                <div className="mb-3">
    <label className="form-label">Pontos da Missão:</label>
    <div className="input-group">
        <input
            type="number"
            className="form-control"
            value={100}
            disabled
        />
        <span className="input-group-text bg-light">
            <img
                src="/assets/icons/coin.svg"
                alt="coin"
                style={{ width: '20px', height: '20px' }}
            />
        </span>
    </div>
</div>
                <button type="submit" className="btn btn-success w-100">Criar Missão</button>
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

export default CriarMissao;
