import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import missoesService from '../../services/missoesService';

const ListarMissoes = () => {
    const [missoes, setMissoes] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const history = useHistory();

    useEffect(() => {
        carregarMissoes();
    }, []);

    useEffect(() => {
        if (mensagem) {
            const timer = setTimeout(() => setMensagem(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [mensagem]);

    const carregarMissoes = async () => {
        try {
            const response = await missoesService.listarMissoes();
            setMissoes(response);
        } catch (error) {
            console.error("Erro ao listar missões:", error);
            setMensagem("Erro ao carregar missões.");
        }
    };

    const concluirMissao = async (missaoId, pontosRecompensa) => {
        try {
            await missoesService.concluirMissao(missaoId, pontosRecompensa);
            setMissoes(missoes.filter(missao => missao.id !== missaoId));
            setMensagem(`Missão concluída! Você ganhou ${pontosRecompensa} pontos.`);
        } catch (error) {
            console.error('Erro ao concluir missão:', error);
            setMensagem('Erro ao concluir missão.');
        }
    };

    const excluirMissao = async (missaoId) => {
        try {
            await missoesService.removerMissao(missaoId);
            setMissoes(missoes.filter(missao => missao.id !== missaoId));
            setMensagem('Missão excluída com sucesso.');
        } catch (error) {
            console.error('Erro ao excluir missão:', error);
            setMensagem('Erro ao excluir missão.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h2 className="mb-4 text-center">Lista de Missões</h2>

            {mensagem && (
                <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`}>
                    {mensagem}
                </div>
            )}

            {missoes.length === 0 ? (
                <p className="text-center">Nenhuma missão cadastrada no momento.</p>
            ) : (
                <ul className="list-group">
                    {missoes.map(missao => (
                        <li
                            key={missao.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>{missao.descricao}</strong> <br />
                                <small>{missao.pontos_recompensa} pontos</small>
                            </div>
                            <div className="btn-group">
                                <button
                                    onClick={() => concluirMissao(missao.id, missao.pontos_recompensa)}
                                    className="btn btn-success btn-sm"
                                >
                                    Concluir
                                </button>
                                <button
                                    onClick={() => excluirMissao(missao.id)}
                                    className="btn btn-danger btn-sm ms-2"
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={() => history.push('/dashboard')}
                className="btn btn-outline-primary w-100 mt-4"
            >
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default ListarMissoes;
