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

    updatePontos: (id, pontos) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE usuarios SET pontos = ? WHERE id = ?';
            db.query(query, [pontos, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
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
    }
};

module.exports = Usuario;