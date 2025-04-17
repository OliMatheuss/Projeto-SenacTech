import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { listarRecompensas, resgatarRecompensa, removerRecompensa } from '../../services/recompensaService';

const ListarRecompensas = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [pontosUsuario, setPontosUsuario] = useState(0);
    const history = useHistory();

    useEffect(() => {
        carregarDadosUsuario();
        carregarRecompensas();
    }, []);

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

    const carregarRecompensas = async () => {
        try {
            setLoading(true);
            const data = await listarRecompensas();
            setRecompensas(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResgatar = async () => {
        try {
            const recompensa = await resgatarRecompensa(); // opcionalmente: resgatarRecompensa(id)
            setMensagem(`Recompensa resgatada: ${recompensa.descricao}`);
            carregarRecompensas();
        } catch (err) {
            setMensagem('Erro ao resgatar recompensa: ' + err.message);
        }
    };

    const handleExcluir = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta recompensa?")) {
            try {
                await removerRecompensa(id);
                setMensagem('Recompensa excluída com sucesso!');
                carregarRecompensas();
            } catch (err) {
                setMensagem('Erro ao excluir recompensa: ' + err.message);
            }
        }
    };

    if (loading) return <div className="text-center mt-5">Carregando recompensas...</div>;
    if (error) return <div className="alert alert-danger mt-4">Erro: {error}</div>;

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            
            {/* Título da página */}
            <h2 className="page-title">Lista de Recompensas</h2>

            {/* Info do usuário no topo */}
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


            {mensagem && (
                <div className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`}>
                    {mensagem}
                </div>
            )}

            {/* Lista de recompensas */}
            {recompensas.length === 0 ? (
                <p className="text-center">Nenhuma recompensa cadastrada.</p>
            ) : (
                <ul className="list-group">
                    {recompensas.map((recompensa) => (
                        <li
                            key={recompensa.id}
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
                                <strong style={{ fontSize: '1.1rem' }}>{recompensa.descricao}</strong> <br />
                                <small style={{ color: '#ffcc66' }}>{recompensa.pontos} pontos</small>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleResgatar()}
                                    className="btn btn-sm me-2"
                                    style={{
                                        backgroundColor: '#28a745',
                                        border: 'none',
                                        color: 'white',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                        borderRadius: '8px'
                                    }}
                                >
                                    Resgatar
                                </button>
                                <button
                                    onClick={() => handleExcluir(recompensa.id)}
                                    className="btn btn-sm"
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

            {/* Botão voltar */}
            <button
                onClick={() => history.push('/dashboard')}
                className="btn btn-primary w-100 mt-4"
            >
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default ListarRecompensas;
