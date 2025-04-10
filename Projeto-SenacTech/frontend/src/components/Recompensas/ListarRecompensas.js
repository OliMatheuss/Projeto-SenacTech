import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { listarRecompensas, resgatarRecompensa, removerRecompensa } from '../../services/recompensaService';

const ListarRecompensas = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const history = useHistory();

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
            <h2 className="page-title">Lista de Recompensas</h2>

            {mensagem && (
                <div
                    className={`alert ${mensagem.includes('Erro') ? 'alert-danger' : 'alert-success'}`}
                >
                    {mensagem}
                </div>
            )}

            {recompensas.length === 0 ? (
                <p className="text-center">Nenhuma recompensa cadastrada.</p>
            ) : (
                <ul className="list-group">
                    {recompensas.map((recompensa) => (
                        <li
                            key={recompensa.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>{recompensa.descricao}</strong> <br />
                                <small>{recompensa.pontos} pontos</small>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleResgatar()} // ou passar o ID: handleResgatar(recompensa.id)
                                    className="btn btn-success btn-sm me-2"
                                >
                                    Resgatar
                                </button>
                                <button
                                    onClick={() => handleExcluir(recompensa.id)}
                                    className="btn btn-danger btn-sm"
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

export default ListarRecompensas;
