import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { listarRecompensas, resgatarRecompensa, removerRecompensa } from '../../services/recompensaService';

const ListarRecompensas = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        carregarRecompensas();
    }, []);

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
            const recompensa = await resgatarRecompensa();
            alert(`Recompensa resgatada: ${recompensa.descricao}`);
            carregarRecompensas(); // Recarrega a lista após resgate
        } catch (err) {
            alert('Erro ao resgatar recompensa: ' + err.message);
        }
    };

    const handleExcluir = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir esta recompensa?")) {
            try {
                await removerRecompensa(id);
                carregarRecompensas();
            } catch (err) {
                alert('Erro ao excluir recompensa: ' + err.message);
            }
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar recompensas: {error}</div>;

    return (
        <div>
            <h2>Recompensas</h2>
            <ul>
    {recompensas.map(recompensa => (
        <li key={recompensa.id} style={{ marginBottom: '10px' }}>
            <div style={{ fontWeight: 'bold' }}>
                {recompensa.descricao} ({recompensa.pontos} pontos)
            </div>
            <div style={{ marginTop: '5px' }}>
                <button
                    onClick={() => handleResgatar()}
                    className="btn btn-success btn-sm"
                    style={{ marginRight: '10px' }}
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
            <button
                onClick={() => history.push('/dashboard')}
                className="btn btn-outline-primary"
                style={{ marginTop: '20px' }}
            >
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default ListarRecompensas;
