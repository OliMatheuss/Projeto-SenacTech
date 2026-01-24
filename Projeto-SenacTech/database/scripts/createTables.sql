-- Comandos SQL para criar as tabelas no banco de dados conforme a estrutura definida no projeto GachaLife

-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS dbgachalife;
USE dbgachalife;

-- Estrutura para tabela `usuarios`
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `pontos` INT(11) DEFAULT 1,
  `status` ENUM('ativo','banido','inativo') DEFAULT 'ativo',
  `data_criacao` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estrutura para tabela `missoes`
CREATE TABLE IF NOT EXISTS `missoes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` INT(11) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `pontos_recompensa` INT(11) DEFAULT 100,
  `data_conclusao` TIMESTAMP NULL DEFAULT NULL,
  `concluida` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estrutura para tabela `recompensas`
CREATE TABLE IF NOT EXISTS `recompensas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` INT(11) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `pontos_necessarios` INT(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;