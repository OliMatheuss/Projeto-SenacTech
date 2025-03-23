import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importação do useHistory
import { listarRecompensas } from '../../services/recompensaService';

const ListarRecompensas = () => {
    const [recompensas, setRecompensas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory(); // Inicialização do useHistory

    useEffect(() => {
        const fetchRecompensas = async () => {
            try {
                const data = await listarRecompensas();
                setRecompensas(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecompensas();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar recompensas: {error}</div>;
    }

    return (
        <div>
            <h2>Recompensas</h2>
            <ul>
                {recompensas.map(recompensa => (
                    <li key={recompensa.id}>{recompensa.descricao}</li>
                ))}
            </ul>
            <button onClick={() => history.push('/dashboard')} className="btn btn-outline-primary" style={{ marginTop: '20px' }}>
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default ListarRecompensas;