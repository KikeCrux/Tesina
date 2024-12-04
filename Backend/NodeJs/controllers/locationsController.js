const { validationResult } = require('express-validator');
const db = require('../config/db');

// Obtener todas las ubicaciones
exports.getAllLocations = (req, res) => {
    const query = 'SELECT * FROM ubicaciones';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las ubicaciones', error: err });
        }
        res.status(200).json(results);
    });
};

// Obtener ubicaciones por usuario
exports.getLocationsByUser = (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ message: 'El ID del usuario es obligatorio.' });
    }

    const query = `
        SELECT * 
        FROM ubicaciones 
        WHERE id_usuario = ?`;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las ubicaciones del usuario', error: err });
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

    const query = `
        INSERT INTO ubicaciones (tipo_ubicacion, direccion, id_usuario) 
        VALUES (?, ?, ?)`;

    db.query(query, [tipo_ubicacion, direccion, id_usuario], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear la ubicación', error: err });
        }
        res.status(201).json({ message: 'Ubicación creada exitosamente', location_id: result.insertId });
    });
};

// Actualizar una ubicación
exports.updateLocation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { location_id } = req.params;
    const { tipo_ubicacion, direccion } = req.body;

    const query = `
        UPDATE ubicaciones 
        SET tipo_ubicacion = ?, direccion = ? 
        WHERE id_ubicacion = ?`;

    db.query(query, [tipo_ubicacion, direccion, location_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar la ubicación', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ubicación no encontrada.' });
        }
        res.status(200).json({ message: 'Ubicación actualizada exitosamente.' });
    });
};

// Eliminar una ubicación
exports.deleteLocation = (req, res) => {
    const { location_id } = req.params;

    const query = `
        DELETE FROM ubicaciones 
        WHERE id_ubicacion = ?`;

    db.query(query, [location_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar la ubicación', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Ubicación no encontrada.' });
        }
        res.status(200).json({ message: 'Ubicación eliminada exitosamente.' });
    });
};
