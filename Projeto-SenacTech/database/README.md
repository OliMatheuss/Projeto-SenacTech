# Estrutura do Banco de Dados para o Projeto GachaLife

Este documento fornece uma visão geral da estrutura do banco de dados utilizada no projeto GachaLife, incluindo as tabelas e seus relacionamentos.

## Tabelas

### 1. Tabela `usuarios`

Armazena os dados dos usuários.

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    pontos INT DEFAULT 1
);
```

### 2. Tabela `missoes`

Armazena as missões criadas pelos usuários.

```sql
CREATE TABLE missoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descricao TEXT NOT NULL,
    valor_da_missao INT DEFAULT 100,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

### 3. Tabela `recompensa`

Armazena as recompensas definidas pelos usuários.

```sql
CREATE TABLE recompensa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    descricao TEXT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

## Scripts SQL

Os scripts SQL para criar as tabelas e inserir dados iniciais estão localizados na pasta `scripts`:

- `createTables.sql`: Contém os comandos para criar as tabelas `usuarios`, `missoes` e `recompensa`.
- `seedData.sql`: Contém comandos para inserir dados iniciais nas tabelas.

## Conclusão

Esta estrutura de banco de dados foi projetada para suportar as funcionalidades do aplicativo GachaLife, garantindo que os dados dos usuários, missões e recompensas sejam armazenados de forma eficiente e segura.