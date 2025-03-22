# Projeto-SenacTech Backend

Este documento fornece uma visão geral do projeto backend do GachaLife, incluindo a estrutura do projeto, as tecnologias utilizadas e as instruções para configuração e execução.

## Estrutura do Projeto

```
backend
├── src
│   ├── app.js                  # Ponto de entrada da aplicação backend
│   ├── config
│   │   └── db.js               # Configuração da conexão com o banco de dados MySQL
│   ├── controllers
│   │   ├── authController.js    # Gerenciamento da autenticação de usuários
│   │   ├── missoesController.js  # Gerenciamento das missões
│   │   └── recompensaController.js # Gerenciamento das recompensas
│   ├── models
│   │   ├── usuarioModel.js      # Modelo de dados para usuários
│   │   ├── missoesModel.js      # Modelo de dados para missões
│   │   └── recompensaModel.js    # Modelo de dados para recompensas
│   └── routes
│       ├── authRoutes.js        # Rotas de autenticação
│       ├── missoesRoutes.js     # Rotas de missões
│       └── recompensaRoutes.js   # Rotas de recompensas
├── package.json                 # Dependências e scripts do projeto
├── .env                         # Variáveis de ambiente
└── README.md                    # Documentação do projeto backend
```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no backend.
- **Express**: Framework para construção de APIs.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **JWT (JSON Web Token)**: Para autenticação de usuários.

## Configuração do Banco de Dados

O banco de dados deve ser configurado conforme a estrutura definida no projeto. As tabelas a serem criadas são:

- `usuarios`: Armazena os dados dos usuários.
- `missoes`: Armazena as missões criadas pelos usuários.
- `recompensa`: Armazena as recompensas definidas pelos usuários.

## Instruções de Execução

1. Clone o repositório.
2. Navegue até a pasta `backend`.
3. Instale as dependências com o comando:
   ```
   npm install
   ```
4. Configure o arquivo `.env` com as credenciais do banco de dados.
5. Inicie o servidor com o comando:
   ```
   npm start
   ```

## Conclusão

Este documento fornece uma visão geral do backend do projeto GachaLife, incluindo a estrutura do projeto e as instruções necessárias para configuração e execução.