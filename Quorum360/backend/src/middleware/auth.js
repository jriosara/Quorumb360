const jwt = require('jsonwebtoken');
const { pool } = require('../config/database'); // Asegúrate que la ruta sea correcta

const authenticateToken = async (req, res, next) => {
    try {

        console.log('Authorization header:', req.headers.authorization);

        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token de acceso requerido'
            });
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscar usuario directamente con el pool de MySQL
        const [rows] = await pool.query(
            'SELECT id, nombre, correo, activo FROM usuarios WHERE id = ?',
            [decoded.userId]
        );

        if (rows.length === 0 || !rows[0].activo) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado o cuenta inactiva'
            });
        }

        req.user = rows[0];
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado'
            });
        }

        console.error('Error en authenticateToken:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Token generators
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId, type: 'refresh' }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = {
    authenticateToken,
    generateToken,
    generateRefreshToken
};
