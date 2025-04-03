import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import missoesService from '../../services/missoesService';

const ListarMissoes = () => {
    const [missoes, setMissoes] = useState([]);
    const history = useHistory();

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

    // Função para concluir a missão (excluir + somar pontos)
    const concluirMissao = async (missaoId, pontosRecompensa) => {
        try {
            await missoesService.concluirMissao(missaoId, pontosRecompensa);
            setMissoes(missoes.filter(missao => missao.id !== missaoId)); // Atualiza a lista
            alert(`Missão concluída! Você ganhou ${pontosRecompensa} pontos.`);
        } catch (error) {
            console.error('Erro ao concluir missão:', error);
        }
    };

    // Função para excluir a missão sem somar pontos
    const excluirMissao = async (missaoId) => {
        try {
            await missoesService.removerMissao(missaoId);
            setMissoes(missoes.filter(missao => missao.id !== missaoId)); // Atualiza a lista
            alert('Missão excluída com sucesso.');
        } catch (error) {
            console.error('Erro ao excluir missão:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Missões</h2>
            <ul>
                {missoes.map(missao => (
                    <li key={missao.id}>
                        {missao.descricao} - Valor: {missao.pontos_recompensa} pontos
                        <button onClick={() => concluirMissao(missao.id, missao.pontos_recompensa)} 
                            className="btn btn-success" style={{ marginLeft: '10px' }}>
                            Concluir Missão
                        </button>
                        <button onClick={() => excluirMissao(missao.id)} 
                            className="btn btn-danger" style={{ marginLeft: '10px' }}>
                            Excluir Missão
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={() => history.push('/dashboard')} 
                className="btn btn-outline-primary" style={{ marginTop: '20px' }}>
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default ListarMissoes;
