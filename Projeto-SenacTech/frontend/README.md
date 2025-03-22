# Projeto-SenacTech Frontend

Este é o frontend do projeto GachaLife, um aplicativo desenvolvido em React.js que incentiva os usuários a realizarem bons atos por meio de um sistema de missões e recompensas.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
frontend
├── public
│   └── index.html          # Ponto de entrada da aplicação frontend
├── src
│   ├── App.js              # Componente principal da aplicação React
│   ├── index.js            # Ponto de entrada da aplicação React
│   ├── components          # Componentes reutilizáveis
│   │   ├── Auth            # Componentes de autenticação
│   │   │   ├── Login.js    # Componente de login
│   │   │   └── Register.js  # Componente de registro
│   │   ├── Missoes         # Componentes relacionados a missões
│   │   │   ├── CriarMissao.js  # Componente para criar missões
│   │   │   └── ListarMissoes.js # Componente para listar missões
│   │   ├── Recompensas     # Componentes relacionados a recompensas
│   │   │   ├── CriarRecompensa.js # Componente para criar recompensas
│   │   │   └── ListarRecompensas.js # Componente para listar recompensas
│   ├── pages               # Páginas da aplicação
│   │   ├── Home.js         # Componente da página inicial
│   │   ├── Dashboard.js     # Componente do painel do usuário
│   │   └── ResgatarRecompensa.js # Componente para resgatar recompensas
│   ├── services            # Serviços para interagir com a API
│   │   ├── api.js          # Funções para interagir com a API backend
│   │   ├── authService.js  # Funções para gerenciar a autenticação
│   │   ├── missoesService.js # Funções para gerenciar missões
│   │   └── recompensaService.js # Funções para gerenciar recompensas
├── package.json            # Dependências e scripts do projeto frontend
└── README.md               # Documentação do projeto frontend
```

## Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router**: Para gerenciamento de rotas na aplicação.
- **Axios**: Para realizar requisições HTTP à API backend.

## Como Executar o Projeto

1. Navegue até a pasta `frontend`.
2. Instale as dependências com o comando:
   ```
   npm install
   ```
3. Inicie a aplicação com o comando:
   ```
   npm start
   ```
4. A aplicação estará disponível em `http://localhost:3000`.

## Contribuição

Sinta-se à vontade para contribuir com o projeto. Para isso, faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.