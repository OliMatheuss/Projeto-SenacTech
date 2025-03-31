// backend/src/models/missoesModel.js
const db = require('../config/db');

const Missoes = {
    create: (usuario_id, descricao, pontos_recompensa = 100, data_conclusao = null, concluida = 0) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO missoes (usuario_id, descricao, pontos_recompensa, data_conclusao, concluida) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [usuario_id, descricao, pontos_recompensa, data_conclusao, concluida], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    },

    findByUserId: (usuario_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM missoes WHERE usuario_id = ?';
            db.query(query, [usuario_id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM missoes WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            });
        });
    }
};

module.exports = Missoes;