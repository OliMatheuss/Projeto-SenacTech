const db = require('../config/db'); // Conexão com o banco de dados MySQL
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Função para registrar um novo usuário
exports.register = async (req, res) => {
    const { username, email, senha } = req.body;

    if (!username || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verifica se o e-mail já está cadastrado
        const [existingUser] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Insere o novo usuário no banco de dados
        await db.promise().query(
            'INSERT INTO usuarios (username, email, senha, pontos, status) VALUES (?, ?, ?, ?, ?)',
            [username, email, hashedPassword, 0, 'ativo']
        );

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
};

// Função para fazer login
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Busca o usuário pelo e-mail
        const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const usuario = rows[0];

        if (!usuario) {
            return res.status(400).json({ message: 'Usuário não encontrado.' });
        }

        // Verifica se a senha está correta
        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token e os dados do usuário
        res.json({
            token,
            user: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email,
                pontos: usuario.pontos || 0, // Inclua outros campos relevantes, como "pontos"
                status: usuario.status, // Inclui o status do usuário
                data_criacao: usuario.data_criacao, // Inclui a data de criação
            },
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
};