const db = require('../config/db');

// Obtener todos los paquetes
exports.getPackages = (req, res) => {
    const query = 'SELECT * FROM paquetes';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los paquetes', error: err });
        }
        res.status(200).json(results);
    });
};

// Crear un nuevo paquete
exports.createPackage = (req, res) => {
    const { nombre_paquete, descripcion, precio_paquete, decoracion } = req.body;

    if (!nombre_paquete || !precio_paquete) {
        return res.status(400).json({ message: 'El nombre y precio del paquete son obligatorios' });
    }

    const query = `INSERT INTO paquetes (nombre_paquete, descripcion, precio_paquete, decoracion) 
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [nombre_paquete, descripcion || null, precio_paquete, decoracion || null], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el paquete', error: err });
        }
        res.status(201).json({ message: 'Paquete creado exitosamente', id_paquete: result.insertId });
    });
};

// Actualizar un paquete existente
exports.updatePackage = (req, res) => {
    const { id_paquete } = req.params;
    const { nombre_paquete, descripcion, precio_paquete, decoracion } = req.body;

    const query = `
        UPDATE paquetes 
        SET nombre_paquete = ?, descripcion = ?, precio_paquete = ?, decoracion = ? 
        WHERE id_paquete = ?`;
    db.query(query, [nombre_paquete, descripcion, precio_paquete, decoracion, id_paquete], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el paquete', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Paquete no encontrado' });
        }
        res.status(200).json({ message: 'Paquete actualizado exitosamente' });
    });
};

// Eliminar un paquete
exports.deletePackage = (req, res) => {
    const { id_paquete } = req.params;

    const query = 'DELETE FROM paquetes WHERE id_paquete = ?';
    db.query(query, [id_paquete], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar el paquete', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Paquete no encontrado' });
        }
        res.status(200).json({ message: 'Paquete eliminado exitosamente' });
    });
};
