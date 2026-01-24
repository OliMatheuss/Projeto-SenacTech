const db = require('../config/db');

const Missoes = {
    create: (usuario_id, descricao, pontos_recompensa = 100) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO missoes
                (usuario_id, descricao, pontos_recompensa, concluida)
                VALUES (?, ?, ?, 0)
            `;
            db.query(query, [usuario_id, descricao, pontos_recompensa], (err, res) => {
                if (err) return reject(err);
                resolve(res.insertId);
            });
        });
    },

    findByUserId: (usuario_id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM missoes
                WHERE usuario_id = ?
                AND concluida = 0
                ORDER BY id DESC
            `;
            db.query(query, [usuario_id], (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    },

    concluir: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE missoes
                SET concluida = 1,
                    data_conclusao = NOW()
                WHERE id = ?
            `;
            db.query(query, [id], (err, res) => {
                if (err) return reject(err);
                resolve(res.affectedRows);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM missoes WHERE id = ?';
            db.query(query, [id], (err, res) => {
                if (err) return reject(err);
                resolve(res.affectedRows);
            });
        });
    },

    findByIdAndUserId: (id, usuario_id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM missoes
                WHERE id = ? AND usuario_id = ?
            `;
            db.query(query, [id, usuario_id], (err, res) => {
                if (err) return reject(err);
                resolve(res[0]); // Retorna apenas a primeira missão encontrada
            });
        });
    },
};

module.exports = Missoes;
