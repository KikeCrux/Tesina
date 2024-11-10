const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Controlador para el inicio de sesión
exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { correo, contrasena } = req.body;

    const query = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(query, [correo], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuario = results[0];

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                correo: usuario.correo,
                nombre_cliente: usuario.nombre_cliente,
                tipo_usuario: usuario.tipo_usuario
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    });
};

// Controlador para el registro de usuarios
exports.register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { correo, contrasena, nombre_cliente, telefono, tipo_usuario } = req.body;

    const queryCheck = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(queryCheck, [correo], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor', error: err });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const queryInsert = `INSERT INTO usuarios (correo, contrasena, nombre_cliente, telefono, tipo_usuario)
                             VALUES (?, ?, ?, ?, ?)`;
        db.query(queryInsert, [correo, hashedPassword, nombre_cliente, telefono, tipo_usuario], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al registrar el usuario', error: err });
            }
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        });
    });
};

// Middleware para verificar tokens
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const message = err.name === 'TokenExpiredError' ? 'El token ha expirado' : 'Token inválido';
            return res.status(401).json({ message });
        }
        req.user = decoded;
        next();
    });
};