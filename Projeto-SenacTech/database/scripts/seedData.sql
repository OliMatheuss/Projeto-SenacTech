INSERT INTO usuarios (username, email, senha, pontos) VALUES
('usuario1', 'usuario1@example.com', 'senha1', 1),
('usuario2', 'usuario2@example.com', 'senha2', 1),
('usuario3', 'usuario3@example.com', 'senha3', 1);

INSERT INTO missoes (usuario_id, descricao, valor_da_missao) VALUES
(1, 'Ajudar um amigo', 100),
(1, 'Doar para uma instituição', 100),
(2, 'Limpar um parque', 100),
(3, 'Visitar um idoso', 100);

INSERT INTO recompensa (usuario_id, descricao) VALUES
(1, 'Vale-presente de R$10'),
(1, 'Dia de folga'),
(2, 'Cesta básica'),
(3, 'Ingressos para o cinema');