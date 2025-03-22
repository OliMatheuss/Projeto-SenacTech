// backend/src/models/missoesModel.js
const db = require('../config/db');

const Missoes = {
    create: (usuario_id, descricao, valor_da_missao = 100) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO missoes (usuario_id, descricao, valor_da_missao) VALUES (?, ?, ?)';
            db.query(query, [usuario_id, descricao, valor_da_missao], (error, results) => {
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