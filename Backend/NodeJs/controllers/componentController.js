const db = require('../config/db');

// Obtener componentes de un paquete
exports.getComponentsByPackage = (req, res) => {
    const { id_paquete } = req.params;

    if (!id_paquete) {
        return res.status(400).json({ message: 'El ID del paquete es obligatorio' });
    }

    const query = `
        SELECT * 
        FROM componentespaquetes 
        WHERE id_paquete = ?`;

    db.query(query, [id_paquete], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los componentes', error: err });
        }
        res.status(200).json(results);
    });
};

// Agregar un componente a un paquete
exports.addComponentToPackage = (req, res) => {
    const { id_paquete, tipo_componente, nombre_componente, cantidad } = req.body;

    if (!id_paquete || !tipo_componente || !nombre_componente || !cantidad) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const query = `
        INSERT INTO componentespaquetes (id_paquete, tipo_componente, nombre_componente, cantidad) 
        VALUES (?, ?, ?, ?)`;

    db.query(query, [id_paquete, tipo_componente, nombre_componente, cantidad], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al agregar el componente', error: err });
        }
        res.status(201).json({ message: 'Componente agregado exitosamente', id_componente: result.insertId });
    });
};

// Actualizar un componente
exports.updateComponent = (req, res) => {
    const { id_componente } = req.params;
    const { tipo_componente, nombre_componente, cantidad } = req.body;

    if (!id_componente || !tipo_componente || !nombre_componente || !cantidad) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const query = `
        UPDATE componentespaquetes 
        SET tipo_componente = ?, nombre_componente = ?, cantidad = ? 
        WHERE id_componente = ?`;

    db.query(query, [tipo_componente, nombre_componente, cantidad, id_componente], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el componente', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Componente no encontrado' });
        }
        res.status(200).json({ message: 'Componente actualizado exitosamente' });
    });
};

// Eliminar un componente
exports.deleteComponent = (req, res) => {
    const { id_componente } = req.params;

    const query = `
        DELETE FROM componentespaquetes 
        WHERE id_componente = ?`;

    db.query(query, [id_componente], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar el componente', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Componente no encontrado' });
        }
        res.status(200).json({ message: 'Componente eliminado exitosamente' });
    });
};
