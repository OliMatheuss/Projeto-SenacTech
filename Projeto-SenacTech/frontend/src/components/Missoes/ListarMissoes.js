import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import missoesService from '../../services/missoesService';
import AuthContext from '../../contexts/AuthContext';
import "../../styles/missoes.css";

const ListarMissoes = () => {
    const [missoes, setMissoes] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const history = useHistory();

    const { user, fetchUserFromAPI } = useContext(AuthContext);

    // Carrega missões
    useEffect(() => {
        carregarMissoes();
    }, []);

    // Limpa mensagem após 3s
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
        }
    };

    const concluirMissao = async (missaoId, pontosRecompensa) => {
        try {
            await missoesService.concluirMissao(missaoId);
            setMissoes(prev =>
                prev.filter(missao => missao.id !== missaoId)
            );
            await fetchUserFromAPI(); // 🔥 atualiza pontos reais
            setMensagem(`Missão concluída! Você ganhou ${pontosRecompensa} pontos.`);
        } catch (error) {
            console.error('Erro ao concluir missão:', error);
            setMensagem('Erro ao concluir missão.');
        }
    };

    const excluirMissao = async (missaoId) => {
        try {
            await missoesService.removerMissao(missaoId);
            setMissoes(prev =>
                prev.filter(missao => missao.id !== missaoId)
            );
            setMensagem('Missão excluída com sucesso.');
        } catch (error) {
            console.error('Erro ao excluir missão:', error);
            setMensagem('Erro ao excluir missão.');
        }
    };

    return (
        <div className="page-container">
            <div className="card">
                <h1>Lista de Missões</h1>

                {/* Usuário */}
                {user && (
                    <div className="text-center mb-4 p-3 rounded"
                        style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            color: '#fffbe7',
                            fontWeight: 'bold',
                            fontSize: '1.3rem'
                        }}
                    >
                        Olá, {user.username}! Você tem{' '}
                        <span style={{ color: '#ffe066', fontSize: '1.5rem' }}>
                            {user.pontos}
                        </span>{' '}
                        pontos
                    </div>
                )}

                {/* Mensagem */}
                {mensagem && (
                    <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`}>
                        {mensagem}
                    </div>
                )}

                {/* Lista */}
                {missoes.length === 0 ? (
                    <p className="text-center">Nenhuma missão cadastrada no momento.</p>
                ) : (
                    <ul className="list-group">
                        {missoes.map(missao => (
                            <li key={missao.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    marginBottom: '10px',
                                    color: '#fff'
                                }}
                            >
                                <div>
                                    <strong>{missao.descricao}</strong><br />
                                    <small>{missao.pontos_recompensa} pontos</small>
                                </div>

                                <div className="btn-group">
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => concluirMissao(missao.id, missao.pontos_recompensa)}
                                    >
                                        Concluir
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => excluirMissao(missao.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    className="btn btn-secondary w-100 mt-3"
                    onClick={() => history.push('/dashboard')}
                >
                    Voltar para o Dashboard
                </button>
            </div>
        </div>
    );
};

export default ListarMissoes;
