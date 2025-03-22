import missoesService from '../../services/missoesService';

const ListarMissoes = () => {
    const [missoes, setMissoes] = useState([]);

    useEffect(() => {
        const fetchMissoes = async () => {
            try {
                const response = await missoesService.listarMissoes(); // Use o objeto missoesService
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
        </div>
    );
};

export default ListarMissoes;