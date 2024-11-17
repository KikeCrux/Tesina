const { validationResult } = require('express-validator');
const db = require('../config/db');

// Obtener todos los clientes de mayoreo
exports.getWholesaleClients = (req, res) => {
    db.query(`SELECT * FROM clientesmayoreo`, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los clientes de mayoreo', error: err });
        }
        res.status(200).json(results);
    });
};

// Crear un cliente de mayoreo
exports.createWholesaleClient = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_usuario, nombre_negocio } = req.body;

    const query = `INSERT INTO clientesmayoreo (id_usuario, nombre_negocio) VALUES (?, ?)`;
    db.query(query, [id_usuario, nombre_negocio], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el cliente de mayoreo', error: err });
        }
        res.status(201).json({ message: 'Cliente de mayoreo creado exitosamente', id_cliente_mayoreo: result.insertId });
    });
};

// Actualizar un cliente de mayoreo
exports.updateWholesaleClient = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_cliente_mayoreo } = req.params;
    const { id_usuario, nombre_negocio } = req.body;

    const query = `
    UPDATE clientesmayoreo 
    SET id_usuario = ?, nombre_negocio = ? 
    WHERE id_cliente_mayoreo = ?`;

    db.query(query, [id_usuario, nombre_negocio, id_cliente_mayoreo], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el cliente de mayoreo', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente de mayoreo no encontrado' });
        }
        res.status(200).json({ message: 'Cliente de mayoreo actualizado exitosamente' });
    });
};

// Eliminar un cliente de mayoreo
exports.deleteWholesaleClient = (req, res) => {
    const { id_cliente_mayoreo } = req.params;

    const query = `DELETE FROM clientesmayoreo WHERE id_cliente_mayoreo = ?`;
    db.query(query, [id_cliente_mayoreo], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar el cliente de mayoreo', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente de mayoreo no encontrado' });
        }
        res.status(200).json({ message: 'Cliente de mayoreo eliminado exitosamente' });
    });
};
