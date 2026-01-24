import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recompensaService from '../../services/recompensaService';
import AuthContext from '../../contexts/AuthContext';

const ListarRecompensas = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const history = useHistory();

    const { user, fetchUserFromAPI } = useContext(AuthContext);

    useEffect(() => {
        carregarRecompensas();
    }, []);

    useEffect(() => {
        if (mensagem) {
            const timer = setTimeout(() => setMensagem(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [mensagem]);

    const carregarRecompensas = async () => {
        try {
            setLoading(true);
            const data = await recompensaService.listarRecompensas();
            setRecompensas(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResgatar = async () => {
        try {
            const recompensa = await recompensaService.resgatarRecompensa();
            setMensagem(`Recompensa resgatada: ${recompensa.descricao}`);
            await fetchUserFromAPI(); // Atualiza os pontos do usuário
            carregarRecompensas();
        } catch (err) {
            setMensagem('Erro ao resgatar recompensa: ' + err.message);
        }
    };

    const handleExcluir = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta recompensa?")) {
            try {
                await recompensaService.removerRecompensa(id);
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
        <div className="page-container">
            <div className="card">
                <h1>Lista de Recompensas</h1>

                {/* Info do usuário no topo */}
                {user && (
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
                        Olá, {user.username}! Você tem{' '}
                        <span style={{ textDecoration: 'underline', fontSize: '1.5rem', color: '#ffe066' }}>
                            {user.pontos}
                        </span>{' '}
                        pontos!
                    </div>
                )}

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
                                    <small>Pontos necessários: {recompensa.pontos_necessarios}</small>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleResgatar()}
                                        className="btn btn-sm me-2"
                                        disabled={user.pontos < recompensa.pontos_necessarios}
                                        style={{
                                            backgroundColor: user.pontos >= recompensa.pontos_necessarios ? '#28a745' : '#6c757d',
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

export default ListarRecompensas;
