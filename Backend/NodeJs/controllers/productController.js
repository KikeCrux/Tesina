const { validationResult } = require('express-validator');
const db = require('../config/db');

// Obtener productos (piñatas individuales)
exports.getProducts = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_usuario, tipo_usuario } = req.query;
    let query = '';
    let queryParams = [];

    if (!id_usuario) {
        // Mostrar precios de menudeo por defecto si no hay un usuario identificado
        query = `SELECT id_producto, nombre, precio_menudeo AS precio, imagen_url FROM productos`;
    } else if (tipo_usuario === 'mayoreo') {
        // Mostrar precios personalizados para clientes de mayoreo
        query = `
        SELECT p.id_producto, p.nombre, pm.precio AS precio, p.imagen_url 
        FROM productos p 
        JOIN preciosmayoreo pm ON p.id_producto = pm.id_producto 
        WHERE pm.id_usuario = ?`;
        queryParams.push(id_usuario);
    } else {
        // Mostrar precios de menudeo para clientes regulares
        query = `SELECT id_producto, nombre, precio_menudeo AS precio, imagen_url FROM productos`;
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los productos', error: err });
        }
        res.json(results);
    });
};

// Crear un nuevo producto
exports.createProduct = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, precio_menudeo, imagen_url } = req.body;

    const query = `INSERT INTO productos (nombre, precio_menudeo, imagen_url) VALUES (?, ?, ?)`;
    db.query(query, [nombre, precio_menudeo, imagen_url || null], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el producto', error: err });
        }
        res.status(201).json({ message: 'Producto creado exitosamente', id_producto: result.insertId });
    });
};

// Actualizar un producto
exports.updateProduct = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_producto } = req.params;
    const { nombre, precio_menudeo, imagen_url } = req.body;

    const query = `
    UPDATE productos 
    SET nombre = ?, precio_menudeo = ?, imagen_url = ? 
    WHERE id_producto = ?`;

    db.query(query, [nombre, precio_menudeo, imagen_url || null, id_producto], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el producto', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    });
};

// Eliminar un producto
exports.deleteProduct = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_producto } = req.params;

    const query = `DELETE FROM productos WHERE id_producto = ?`;
    db.query(query, [id_producto], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar el producto', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    });
};

// Asignar precios personalizados de mayoreo
exports.assignWholesalePrice = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_usuario, id_producto, precio } = req.body;

    const query = `
    INSERT INTO preciosmayoreo (id_usuario, id_producto, precio) 
    VALUES (?, ?, ?) 
    ON DUPLICATE KEY UPDATE precio = VALUES(precio)`;

    db.query(query, [id_usuario, id_producto, precio], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al asignar precio personalizado', error: err });
        }
        res.status(200).json({ message: 'Precio personalizado asignado exitosamente' });
    });
};

// Obtener precios personalizados de mayoreo
exports.getWholesalePrices = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_usuario } = req.query;

    const query = `
    SELECT p.nombre, pm.precio 
    FROM preciosmayoreo pm 
    JOIN productos p ON pm.id_producto = p.id_producto 
    WHERE pm.id_usuario = ?`;

    db.query(query, [id_usuario], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener precios personalizados', error: err });
        }
        res.status(200).json(results);
    });
};
