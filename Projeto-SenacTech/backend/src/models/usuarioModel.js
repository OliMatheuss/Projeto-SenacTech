// backend/src/models/usuarioModel.js
const db = require('../config/db');

const Usuario = {
    create: (usuarioData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO usuarios (username, email, senha, pontos) VALUES (?, ?, ?, ?)';
            db.query(query, [usuarioData.username, usuarioData.email, usuarioData.senha, usuarioData.pontos], (error, results) => {
                if (error) {
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
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuarios WHERE email = ?';
            db.query(query, [email], (error, results) => {
                if (error) {
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
                    return reject(error);
                }
                resolve(results.affectedRows);
            });
        });
    },

    getPontosUsuario: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT pontos FROM usuarios WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                if (results.length === 0) return resolve(null);
                resolve(results[0].pontos);
            });
        });
    },

    atualizarPontosUsuario: (id, novosPontos) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE usuarios SET pontos = ? WHERE id = ?';
            db.query(query, [novosPontos, id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows);
            });
        });
    }
};

module.exports = Usuario;
