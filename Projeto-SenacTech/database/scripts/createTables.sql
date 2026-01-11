-- Comandos SQL para criar as tabelas no banco de dados conforme a estrutura definida no projeto GachaLife

CREATE DATABASE dbgachalife; -- Criação do banco de dados
---------------------------------------------------------------------------------------------------------------
--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `pontos` int(11) DEFAULT 1,
  `status` enum('ativo','banido','inativo') DEFAULT 'ativo',
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
---------------------------------------------------------------------------------------------------------
--
-- Estrutura para tabela `missoes`
--

CREATE TABLE `missoes` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `descricao` varchar(255) NOT NULL,
  `pontos_recompensa` int(11) DEFAULT 100,
  `data_conclusao` timestamp NULL DEFAULT NULL,
  `concluida` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--------------------------------------------------------------------------------------------------
--
-- Estrutura para tabela `recompensas`
--

CREATE TABLE `recompensas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `descricao` varchar(255) NOT NULL,
  `pontos_necessarios` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Adicionar coluna pontos_necessarios se não existir
ALTER TABLE `recompensas` ADD COLUMN `pontos_necessarios` int(11) DEFAULT 0;