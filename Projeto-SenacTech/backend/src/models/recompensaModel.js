const db = require('../config/db');

const Recompensa = {
    create: (usuario_id, descricao, pontos) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO recompensas (usuario_id, descricao, pontos_necessarios) VALUES (?, ?, ?)';
            db.query(query, [usuario_id, descricao, pontos], (error, results) => {
                if (error) {
                    console.error('Erro ao criar recompensa:', error);
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
                    console.error('Erro ao buscar recompensas:', error);
                    return reject(error);
                }
                resolve(results);
            });
        });
    },

    findByIdAndUsuarioId: (id, usuario_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM recompensas WHERE id = ? AND usuario_id = ?';
            db.query(query, [id, usuario_id], (error, results) => {
                if (error) {
                    console.error('Erro ao buscar recompensa específica:', error);
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM recompensas WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    console.error('Erro ao deletar recompensa:', error);
                    return reject(error);
                }
                resolve(results.affectedRows);
            });
        });
    }
};

module.exports = Recompensa;
