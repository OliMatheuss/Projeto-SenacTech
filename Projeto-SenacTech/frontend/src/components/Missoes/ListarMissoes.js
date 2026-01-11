import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import missoesService from '../../services/missoesService';

const ListarMissoes = () => {
    const [missoes, setMissoes] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [pontosUsuario, setPontosUsuario] = useState(0);
    const history = useHistory();

    // Carrega dados do usuário e missões ao iniciar
    useEffect(() => {
        carregarDadosUsuario();
        carregarMissoes();
    }, []);

    // Temporizador para limpar mensagens
    useEffect(() => {
        if (mensagem) {
            const timer = setTimeout(() => setMensagem(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [mensagem]);

    const carregarDadosUsuario = () => {
        const nome = localStorage.getItem('username') ?? 'Usuário';
        const pontos = Number(localStorage.getItem('pontos')) || 0;

        setNomeUsuario(nome);
        setPontosUsuario(pontos);
    };

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
        <div className="page-container">
            <div className="card">
                <h1>Lista de Missões</h1>

            {/* Informações do usuário - AGORA NO TOPO */}
            <div
                className="text-center mb-4 p-3 rounded"
                style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    color: '#fffbe7',
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                }}
            >
                Olá, {nomeUsuario}! Você tem{' '}
                <span style={{ textDecoration: 'underline', fontSize: '1.5rem', color: '#ffe066' }}>
                    {pontosUsuario}
                </span>{' '}
                pontos!
            </div>


            {/* Mensagem de sucesso ou erro */}
            {mensagem && (
                <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`}>
                    {mensagem}
                </div>
            )}

            {/* Lista de missões */}
            {missoes.length === 0 ? (
                <p className="text-center">Nenhuma missão cadastrada no momento.</p>
            ) : (
                <ul className="list-group">
                    {missoes.map(missao => (
                        <li
                            key={missao.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{
                                background: 'rgba(0, 0, 0, 0.5)',
                                border: 'none',
                                borderRadius: '15px',
                                color: '#fff',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                                marginBottom: '10px',
                                padding: '15px'
                            }}
                        >
                            <div>
                                <strong style={{ fontSize: '1.1rem' }}>{missao.descricao}</strong> <br />
                                <small style={{ color: '#ffcc66' }}>{missao.pontos_recompensa} pontos</small>
                            </div>
                            <div className="btn-group">
                                <button
                                    onClick={() => concluirMissao(missao.id, missao.pontos_recompensa)}
                                    className="btn btn-sm"
                                    style={{
                                        backgroundColor: '#28a745',
                                        border: 'none',
                                        color: 'white',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                        borderRadius: '8px'
                                    }}
                                >
                                    Concluir
                                </button>
                                <button
                                    onClick={() => excluirMissao(missao.id)}
                                    className="btn btn-sm ms-2"
                                    style={{
                                        backgroundColor: '#dc3545',
                                        border: 'none',
                                        color: 'white',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                        borderRadius: '8px'
                                    }}
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

                {/* Botão para voltar ao dashboard */}
                <button
                    onClick={() => history.push('/dashboard')}
                    className="btn btn-secondary w-100 mt-3"
                >
                    Voltar para o Dashboard
                </button>
            </div>
        </div>
    );
};

export default ListarMissoes;
