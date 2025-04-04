// arquivo: /Projeto-SenacTech/Projeto-SenacTech/backend/src/models/recompensaModel.js

const db = require('../config/db');

const Recompensa = {
    create: (usuario_id, descricao, pontos) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO recompensas (usuario_id, descricao, pontos) VALUES (?, ?, ?)';
            db.query(query, [usuario_id, descricao, pontos], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    },

    findByUsuarioId: (usuario_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM recompensas WHERE usuario_id = ?';
            db.query(query, [usuario_id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    updatePontos: (id, pontos) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE recompensas SET pontos = ? WHERE id = ?';
            db.query(query, [pontos, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM recompensas WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            });
        });
    }
};

module.exports = Recompensa;
