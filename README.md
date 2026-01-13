# 🎮 GachaLife  
**Projeto de Conclusão — SENAC Tech**

## 📌 Objetivo do Projeto
O **GachaLife** é um aplicativo web desenvolvido com foco em **gamificação**, cujo objetivo é incentivar a realização de boas ações por meio de um sistema de **missões e recompensas personalizadas**.

A proposta do projeto é transformar ações positivas em metas alcançáveis, promovendo engajamento e constância por meio de pontos e recompensas definidas pelo próprio usuário.

---

## 🧠 Visão Geral
O sistema permite que os usuários criem **missões pessoais**, acumulem **pontos** ao concluí-las e utilizem esses pontos para **resgatar recompensas**, também criadas por eles.

Cada missão concluída gera **100 pontos**, que podem ser acumulados e trocados conforme o valor definido em cada recompensa.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js

### Backend
- Node.js
- Express

### Autenticação e Segurança
- JWT (JSON Web Token)
- Bcrypt para criptografia de senhas

---

## 🔄 Fluxo da Aplicação

1. O usuário realiza cadastro e login.
2. Após autenticação, pode criar missões pessoais.
3. Cada missão concluída adiciona **100 pontos** ao usuário.
4. O usuário cria recompensas personalizadas, definindo:
   - Descrição
   - Valor de pontos necessário para o resgate
5. Ao acumular pontos suficientes, o usuário pode resgatar suas recompensas.

---

## 🔌 API — Endpoints Principais

### 🔐 Autenticação
- `POST /api/auth/register` → Cadastro de usuário
- `POST /api/auth/login` → Login e geração de token JWT

---

### 👤 Usuários
- `GET /api/usuarios/:id` → Retorna dados do usuário
- `PATCH /api/usuarios/:id/pontos` → Atualiza a pontuação do usuário

---

### 🎯 Missões
- `POST /api/missoes` → Cria uma nova missão
- `GET /api/missoes/:usuario_id` → Lista as missões do usuário
- `DELETE /api/missoes/:id` → Remove uma missão
- *(Evolução futura)* `PATCH /api/missoes/:id/concluir` → Marca missão como concluída

---

### 🎁 Recompensas
- `POST /api/recompensa` → Cria uma recompensa
- `GET /api/recompensa/:usuario_id` → Lista recompensas do usuário
- `DELETE /api/recompensa/:id` → Remove recompensa
- `POST /api/recompensa/resgatar` → Resgata recompensa conforme pontos disponíveis

---

## 📏 Regras de Negócio
- Cada missão concluída gera **100 pontos**.
- O usuário define o valor de pontos de cada recompensa.
- O resgate só é permitido se o usuário possuir pontos suficientes.
- Missões e recompensas são sempre vinculadas ao usuário autenticado.

---

## 🚀 Considerações Finais
O **GachaLife** é um projeto que une tecnologia e gamificação para incentivar comportamentos positivos de forma simples e personalizada.

Sua arquitetura permite futuras expansões, como:
- Sistema de níveis
- Conquistas
- Rankings
- Funcionalidades sociais
