// arquivo: /Projeto-SenacTech/Projeto-SenacTech/backend/src/models/recompensaModel.js

const db = require('../config/db');

const Recompensa = {
    create: (usuario_id, descricao) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO recompensa (usuario_id, descricao) VALUES (?, ?)';
            db.query(query, [usuario_id, descricao], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            });
        });
    },

    findByUsuarioId: (usuario_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM recompensa WHERE usuario_id = ?';
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
            const query = 'DELETE FROM recompensa WHERE id = ?';
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