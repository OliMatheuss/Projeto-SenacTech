# Projeto-SenacTech
Projeto de Conclusão do Curso Técnico em Desenvolvimento de Sistemas pelo SENAC Tech.
Racunho do Documento Técnico - Projeto GachaLife

1. Visão Geral

Nome do Projeto: GachaLife  
Descrição: Um aplicativo desenvolvido em React.js que incentiva os usuários a realizarem bons atos por meio de um sistema de missões e recompensas.

2. Estrutura do Projeto

O projeto é dividido em três pastas principais: `backend`, `frontend` e `database`.

### 2.1 Backend

A pasta `backend` contém a aplicação Node.js que gerencia a lógica do servidor e a interação com o banco de dados.

- `src/app.js`: Ponto de entrada da aplicação backend, configura o servidor Express e as rotas.
- `src/config/db.js`: Configuração da conexão com o banco de dados MySQL.
- `src/controllers/authController.js`: Funções para gerenciar a autenticação de usuários.
- `src/controllers/missoesController.js`: Funções para gerenciar as missões.
- `src/controllers/recompensaController.js`: Funções para gerenciar as recompensas.
- `src/models/usuarioModel.js`: Modelo de dados para os usuários.
- `src/models/missoesModel.js`: Modelo de dados para as missões.
- `src/models/recompensaModel.js`: Modelo de dados para as recompensas.
- `src/routes/authRoutes.js`: Rotas relacionadas à autenticação de usuários.
- `src/routes/missoesRoutes.js`: Rotas relacionadas às missões.
- `src/routes/recompensaRoutes.js`: Rotas relacionadas às recompensas.
- `package.json`: Dependências e scripts para o projeto backend.
- `.env`: Variáveis de ambiente, como credenciais do banco de dados.
- `README.md`: Documentação do projeto backend.

### 2.2 Frontend

A pasta `frontend` contém a aplicação React que fornece a interface do usuário.

- `public/index.html`: Ponto de entrada da aplicação frontend.
- `src/App.js`: Componente principal da aplicação React.
- `src/index.js`: Ponto de entrada da aplicação React.
- `src/components/Auth/Login.js`: Componente de login.
- `src/components/Auth/Register.js`: Componente de registro.
- `src/components/Missoes/CriarMissao.js`: Componente para criar missões.
- `src/components/Missoes/ListarMissoes.js`: Componente para listar missões.
- `src/components/Recompensas/CriarRecompensa.js`: Componente para criar recompensas.
- `src/components/Recompensas/ListarRecompensas.js`: Componente para listar recompensas.
- `src/pages/Home.js`: Componente da página inicial.
- `src/pages/Dashboard.js`: Componente do painel do usuário.
- `src/pages/ResgatarRecompensa.js`: Componente para resgatar recompensas.
- `src/services/api.js`: Funções para interagir com a API backend.
- `src/services/authService.js`: Funções para gerenciar a autenticação no frontend.
- `src/services/missoesService.js`: Funções para gerenciar missões no frontend.
- `src/services/recompensaService.js`: Funções para gerenciar recompensas no frontend.
- `package.json`: Dependências e scripts para o projeto frontend.
- `README.md`: Documentação do projeto frontend.

### 2.3 Database

A pasta `database` contém scripts SQL para a configuração do banco de dados.

- `scripts/createTables.sql`: Comandos SQL para criar as tabelas no banco de dados.
- `scripts/seedData.sql`: Comandos SQL para inserir dados iniciais nas tabelas.
- `README.md`: Documentação sobre a estrutura do banco de dados.

3. Estrutura do Banco de Dados

O banco de dados é estruturado com as seguintes tabelas:

- **usuarios**: Armazena os dados dos usuários.
- **missoes**: Armazena as missões criadas pelos usuários.
- **recompensa**: Armazena as recompensas definidas pelos usuários.

4. Conclusão

Este documento fornece a base técnica para o desenvolvimento do aplicativo GachaLife, garantindo que o fluxo de incentivos funcione corretamente e seja implementado de forma eficiente.