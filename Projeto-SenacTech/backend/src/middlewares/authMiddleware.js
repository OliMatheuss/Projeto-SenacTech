// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido!' });
  }

  try {
    // Decodifica o token e define req.user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // <--- Isso é ESSENCIAL para as rotas autenticadas
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado!' });
  }
};