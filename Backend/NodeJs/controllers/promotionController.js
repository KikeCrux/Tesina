const { validationResult } = require('express-validator');
const db = require('../config/db');

// Obtener todas las promociones
exports.getPromotions = (req, res) => {
    const query = 'SELECT * FROM promociones';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las promociones', error: err });
        }
        res.status(200).json(results);
    });
};

// Crear una nueva promoción
exports.createPromotion = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { titulo, descripcion, descuento, fecha_inicio, fecha_fin } = req.body;

    if (!titulo || !descuento) {
        return res.status(400).json({ message: 'El título y el descuento son obligatorios' });
    }

    const query = `
        INSERT INTO promociones (titulo, descripcion, descuento, fecha_inicio, fecha_fin)
        VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [titulo, descripcion || null, descuento, fecha_inicio || null, fecha_fin || null], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear la promoción', error: err });
        }
        res.status(201).json({ message: 'Promoción creada exitosamente', id_promocion: result.insertId });
    });
};

// Actualizar una promoción existente
exports.updatePromotion = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_promocion } = req.params;
    const { titulo, descripcion, descuento, fecha_inicio, fecha_fin } = req.body;

    const query = `
        UPDATE promociones 
        SET titulo = ?, descripcion = ?, descuento = ?, fecha_inicio = ?, fecha_fin = ? 
        WHERE id_promocion = ?`;

    db.query(query, [titulo, descripcion, descuento, fecha_inicio, fecha_fin, id_promocion], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar la promoción', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Promoción no encontrada' });
        }
        res.status(200).json({ message: 'Promoción actualizada exitosamente' });
    });
};

// Eliminar una promoción
exports.deletePromotion = (req, res) => {
    const { id_promocion } = req.params;

    const query = 'DELETE FROM promociones WHERE id_promocion = ?';
    db.query(query, [id_promocion], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar la promoción', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Promoción no encontrada' });
        }
        res.status(200).json({ message: 'Promoción eliminada exitosamente' });
    });
};

exports.getActivePromotions = (req, res) => {
    const { id_producto, id_usuario } = req.query;

    let query = `
        SELECT * 
        FROM promociones 
        WHERE NOW() BETWEEN fecha_inicio AND fecha_fin`;
    const queryParams = [];

    if (id_producto) {
        query += ' AND id_producto = ?';
        queryParams.push(id_producto);
    }
    if (id_usuario) {
        query += ' AND id_usuario = ?';
        queryParams.push(id_usuario);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las promociones activas', error: err });
        }
        res.status(200).json(results);
    });
};

