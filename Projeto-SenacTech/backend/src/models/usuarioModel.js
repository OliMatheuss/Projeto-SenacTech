// backend/src/models/usuarioModel.js
const db = require('../config/db');

const Usuario = {
    create: (usuarioData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO usuarios (username, email, senha, pontos) VALUES (?, ?, ?, ?)';
            db.query(query, [usuarioData.username, usuarioData.email, usuarioData.senha, usuarioData.pontos], (error, results) => {
                if (error) {
                    console.error('Erro ao criar usuário:', error);
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuarios WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    console.error('Erro ao buscar usuário por ID:', error);
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    },

    adicionarPontos: (usuario_id, pontos) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE usuarios SET pontos = pontos + ? WHERE id = ?';
            db.query(query, [pontos, usuario_id], (error, results) => {
                if (error) {
                    console.error('Erro ao adicionar pontos ao usuário:', error);
                    return reject(error);
                }
                resolve(results.affectedRows);
            });
        });
    },

    atualizarPontos: (usuario_id, pontos) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE usuarios SET pontos = ? WHERE id = ?';
            db.query(query, [pontos, usuario_id], (error, results) => {
                if (error) {
                    console.error('Erro ao atualizar pontos do usuário:', error);
                    return reject(error);
                }
                resolve(results.affectedRows);
            });
        });
    }
};

module.exports = Usuario;
