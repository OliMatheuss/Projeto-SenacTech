create database appmovies

CREATE DATABASE dcgachhalife;
---------------------------------------------------------------------------------------------------------------
-- Criação da tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- ID do usuário (chave primária)
    email VARCHAR(255) NOT NULL UNIQUE,         -- Email do usuário (único)
    username VARCHAR(255) NOT NULL UNIQUE,      -- Nome de usuário (único)
    senha VARCHAR(255) NOT NULL,             -- Senha do usuário (armazenada como hash)
    pontos INT DEFAULT 0,                       -- Pontos do usuário (padrão 0)
    status ENUM('ativo', 'banido', 'inativo') DEFAULT 'ativo', -- Status do usuário
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação do usuário
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Data de atualização
);
---------------------------------------------------------------------------------------------------------
-- Criação da tabela de missões
CREATE TABLE missoes (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- ID da missão (chave primária)
    usuario_id INT,                            -- ID do usuário que criou a missão (pode ser NULL para missões públicas)
    descricao VARCHAR(255) NOT NULL,           -- Descrição da missão
    pontos_recompensa INT DEFAULT 100,         -- Pontos de recompensa para a missão (padrão 100)
    data_conclusao TIMESTAMP NULL,             -- Data de conclusão da missão
    CONSTRAINT fk_usuario_missao FOREIGN KEY (usuario_id) REFERENCES usuarios(id) -- Chave estrangeira referenciando o usuário
);
--------------------------------------------------------------------------------------------------
-- Criação da tabela de recompensas
CREATE TABLE recompensas (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- ID da recompensa (chave primária)
    usuario_id INT,                            -- ID do usuário que criou a recompensa (pode ser NULL para recompensas globais)
    descricao VARCHAR(255) NOT NULL,            -- Descrição da recompensa
    CONSTRAINT fk_usuario_recompensa FOREIGN KEY (usuario_id) REFERENCES usuarios(id) -- Chave estrangeira referenciando o usuário
);


----------------------------------------------------------------------------------------------
INSERT INTO usuarios (email, senha, pontos) VALUES ('giovane@email.com', '12345', 0);

INSERT INTO missoes (usuario_id, descricao, pontos_recompensa) VALUES (1, 'Missão de exemplo', 100);

INSERT INTO recompensas (usuario_id, descricao) VALUES (1, 'Recompensa de exemplo');
----------------------------------------------------------------------------------------------
http://localhost:5000/api/
http://localhost:5000/api/test-db
comandos 
ctrl + c = renicia o node e react
index node.js
npm start 
