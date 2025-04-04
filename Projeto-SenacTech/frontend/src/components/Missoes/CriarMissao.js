import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importando useHistory corretamente
import missoesService from '../../services/missoesService';

const CriarMissao = () => {
    const [descricao, setDescricao] = useState('');
    const [valorDaMissao, setValorDaMissao] = useState(100);
    const [mensagem, setMensagem] = useState('');
    const history = useHistory(); // Inicializando o useHistory corretamente

    const usuario_id = localStorage.getItem('usuario_id'); // Pegando o ID do usuário salvo no navegador

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const usuario_id = localStorage.getItem('usuario_id'); // Pegando o ID do usuário salvo no navegador
    
        if (!usuario_id) {
            setMensagem('Erro: Usuário não identificado. Faça login novamente.');
            return;
        }
    
        if (!descricao || !valorDaMissao) {
            setMensagem('Erro: Descrição e valor da missão são obrigatórios.');
            return;
        }
    
        try {
            await missoesService.criarMissao({
                usuario_id: Number(usuario_id), // Convertendo para número
                descricao, // Garantir que o valor de descricao não seja vazio
                valor_da_missao: valorDaMissao // Garantir que o valor da missão seja um número válido
            });
    
            setMensagem('Missão criada com sucesso!');
            setDescricao('');
            setValorDaMissao(100);
        } catch (error) {
            setMensagem('Erro ao criar missão. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Criar Missão</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div>
                    
                </div>
                <button type="submit" className="btn btn-outline-success">
                    Criar Missão
                </button>
            </form>
            {mensagem && <p>{mensagem}</p>}
            <button onClick={() => history.push('/dashboard')} className="btn btn-outline-primary" style={{ marginTop: '20px' }}>
                Voltar para o Dashboard
            </button>
        </div>
    );
};

export default CriarMissao;
