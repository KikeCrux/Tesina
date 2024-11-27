const { validationResult } = require('express-validator');
const db = require('../config/db');

// Obtener todas las ubicaciones
exports.getLocations = (req, res) => {
    const { id_usuario } = req.query;

    let query = 'SELECT * FROM ubicaciones';
    const params = [];

    if (id_usuario) {
        query += ' WHERE id_usuario = ?';
        params.push(id_usuario);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las ubicaciones', error: err });
        }
        res.status(200).json(results);
    });
};

// Crear una nueva ubicación
exports.createLocation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { tipo_ubicacion, direccion, id_usuario } = req.body;

    if (!tipo_ubicacion || !direccion) {
        return res.status(400).json({ message: 'El tipo de ubicación y la dirección son obligatorios' });
    }

    const query = `
        INSERT INTO ubicaciones (tipo_ubicacion, direccion, id_usuario) 
        VALUES (?, ?, ?)`;

    db.query(query, [tipo_ubicacion, direccion, id_usuario || null], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear la ubicación', error: err });
        }
        res.status(201).json({ message: 'Ubicación creada exitosamente', id_ubicacion: result.insertId });
    });
};

// Actualizar una ubicación existente
exports.updateLocation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_ubicacion } = req.params;
    const { tipo_ubicacion, direccion } = req.body;

    if (!tipo_ubicacion || !direccion) {
        return res.status(400).json({ message: 'El tipo de ubicación y la dirección son obligatorios' });
    }

    const query = `
        UPDATE ubicaciones 
        SET tipo_ubicacion = ?, direccion = ? 
        WHERE id_ubicacion = ?`;

    db.query(query, [tipo_ubicacion, direccion, id_ubicacion], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar la ubicación', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }
        res.status(200).json({ message: 'Ubicación actualizada exitosamente' });
    });
};

// Eliminar una ubicación
exports.deleteLocation = (req, res) => {
    const { id_ubicacion } = req.params;

    const query = 'DELETE FROM ubicaciones WHERE id_ubicacion = ?';

    db.query(query, [id_ubicacion], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar la ubicación', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ubicación no encontrada' });
        }
        res.status(200).json({ message: 'Ubicación eliminada exitosamente' });
    });
};
