import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importação do useHistory
import missoesService from '../../services/missoesService';

const ListarMissoes = () => {
    const [missoes, setMissoes] = useState([]);
    const history = useHistory(); // Inicialização do useHistory

    useEffect(() => {
        const fetchMissoes = async () => {
            try {
                const response = await missoesService.listarMissoes();
                setMissoes(response);
            } catch (error) {
                console.error("Erro ao listar missões:", error);
            }
        };

        fetchMissoes();
    }, []);

    return (
        <div>
            <h2>Lista de Missões</h2>
            <ul>
                {missoes.map(missao => (
                    <li key={missao.id}>
                        {missao.descricao} - Valor: {missao.valor_da_missao} pontos
                    </li>
                ))}
            </ul>
            <button onClick={() => history.push('/dashboard')} className="btn btn-outline-primary" style={{ marginTop: '20px' }}>
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default ListarMissoes;