# Projeto-SenacTech
Projeto de Conclusão do Curso Técnico em Desenvolvimento de Sistemas pelo SENAC Tech.
Racunho do Documento Técnico - Projeto GachaLife

1. Visão Geral

Nome do Projeto: GachaLifeDescrição: Um aplicativo desenvolvido em React.js que incentiva os usuários a realizarem bons atos por meio de um sistema de missões e recompensas.

2. Tecnologias Utilizadas

Frontend: React.js

Backend: Node.js com Express

Banco de Dados: MySQL

Autenticação: JWT (JSON Web Token)

3. Estrutura do Banco de Dados

3.1 Tabela usuarios

Armazena os dados dos usuários.

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    pontos INT DEFAULT 1
);

3.2 Tabela missoes

Armazena as missões criadas pelos usuários.

CREATE TABLE missoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descricao TEXT NOT NULL,
    valor_da_missao INT DEFAULT 100,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

3.3 Tabela recompensa

Armazena as recompensas definidas pelos usuários.

CREATE TABLE recompensa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descricao TEXT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

4. Fluxo do Aplicativo

O usuário se cadastra e faz login.

O usuário pode criar missões para si mesmo.

Ao concluir uma missão, os pontos são adicionados à conta do usuário.

O usuário pode adicionar recompensas.

Ao atingir 500 pontos, o sistema escolhe aleatoriamente uma recompensa cadastrada pelo próprio usuário.

5. Endpoints da API

5.1 Autenticação

POST /api/auth/register → Cadastro de usuário.

POST /api/auth/login → Login e geração de token JWT.

5.2 Usuários

GET /api/usuarios/:id → Retorna informações do usuário.

PATCH /api/usuarios/:id/pontos → Atualiza pontos do usuário.

5.3 Missões

POST /api/missoes → Criar uma missão.

GET /api/missoes/:usuario_id → Listar missões de um usuário.

DELETE /api/missoes/:id → Remover uma missão.

5.4 Recompensas

POST /api/recompensa → Criar uma recompensa.

GET /api/recompensa/:usuario_id → Listar recompensas do usuário.

DELETE /api/recompensa/:id → Remover uma recompensa.

POST /api/recompensa/resgatar → Seleciona uma recompensa aleatória ao custo de 500 pontos.

6. Regras de Negócio

O usuário pode criar suas próprias missões.

Cada missão completada adiciona pontos ao usuário.

O usuário pode definir recompensas personalizadas.

Ao atingir 500 pontos, o sistema escolhe uma recompensa aleatória cadastrada pelo próprio usuário.

7. Conclusão

Este documento fornece a base técnica para o desenvolvimento do aplicativo GachaLife, garantindo que o fluxo de incentivos funcione corretamente e seja implementado de forma eficiente.

