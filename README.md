Documento Técnico - Projeto GachaLife (Projeto de Conclusão - SENAC Tech)
1. Visão Geral
Nome do Projeto: GachaLife
Descrição:
O GachaLife é um aplicativo desenvolvido em React.js que incentiva os usuários a realizarem boas ações por meio de um sistema de missões e recompensas gamificadas. Cada ação positiva realizada pelo usuário contribui com pontos, que podem ser trocados por recompensas personalizadas.

2. Tecnologias Utilizadas
Frontend: React.js

Backend: Node.js com Express

Banco de Dados: MySQL

Autenticação: JWT (JSON Web Token)

Segurança: Hash de senhas com bcrypt

3. Estrutura do Banco de Dados
3.1 Tabela usuarios
Armazena os dados básicos dos usuários.

sql
Copiar
Editar
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  pontos INT DEFAULT 1
);
3.2 Tabela missoes
Armazena as missões criadas pelos usuários.

sql
Copiar
Editar
CREATE TABLE missoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  descricao TEXT NOT NULL,
  valor_da_missao INT DEFAULT 100,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
3.3 Tabela recompensa
Armazena as recompensas definidas pelos próprios usuários.

sql
Copiar
Editar
CREATE TABLE recompensa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  descricao TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
4. Fluxo do Aplicativo
O usuário realiza o cadastro e login.

Após autenticação, pode criar missões pessoais.

Ao concluir uma missão, seus pontos aumentam.

O usuário pode criar recompensas que deseja receber.

Ao acumular 500 pontos, o sistema sorteia uma recompensa aleatória cadastrada pelo próprio usuário.

5. Endpoints da API
5.1 Autenticação
POST /api/auth/register → Cadastro de novo usuário.

POST /api/auth/login → Login e geração de token JWT.

5.2 Usuários
GET /api/usuarios/:id → Retorna dados do usuário.

PATCH /api/usuarios/:id/pontos → Atualiza pontos do usuário.

5.3 Missões
POST /api/missoes → Cria uma nova missão.

GET /api/missoes/:usuario_id → Lista as missões do usuário.

DELETE /api/missoes/:id → Exclui uma missão.

(Sugestão futura: PATCH /api/missoes/:id/concluir → Marcar missão como concluída)

5.4 Recompensas
POST /api/recompensa → Cria uma recompensa.

GET /api/recompensa/:usuario_id → Lista as recompensas do usuário.

DELETE /api/recompensa/:id → Exclui uma recompensa.

POST /api/recompensa/resgatar → Resgata uma recompensa aleatória ao custo de 500 pontos.

6. Regras de Negócio
Cada usuário pode criar suas próprias missões e recompensas.

Missões concluídas aumentam a pontuação do usuário.

Ao atingir 500 pontos, é possível resgatar uma recompensa aleatória.

As recompensas sorteadas são sempre aquelas cadastradas pelo próprio usuário.

7. Conclusão
Este documento apresenta a base técnica para o desenvolvimento do GachaLife, um aplicativo que combina tecnologia e gamificação para incentivar boas ações. A estrutura proposta garante uma experiência fluida, segura e motivadora para os usuários, com possibilidade de expansão para funcionalidades futuras, como rankings, níveis e interações sociais.
