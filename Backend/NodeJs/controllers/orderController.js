const { validationResult } = require('express-validator');
const db = require('../config/db');

// Obtener todos los pedidos
exports.getOrders = (req, res) => {
    db.query(`SELECT * FROM pedidos`, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los pedidos', error: err });
        }
        res.status(200).json(results);
    });
};

// Crear un pedido y sus detalles
exports.createOrder = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_usuario, total_cantidad_pinatas, total_por_cobrar, fecha_esperada_entrega, detalles } = req.body;

    const queryOrder = `
    INSERT INTO pedidos (id_usuario, total_cantidad_pinatas, total_por_cobrar, fecha_generacion, fecha_esperada_entrega, estado_pedido)
    VALUES (?, ?, ?, NOW(), ?, 'pendiente')`;

    // Insertar pedido
    db.query(queryOrder, [id_usuario, total_cantidad_pinatas, total_por_cobrar, fecha_esperada_entrega || null], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear el pedido', error: err });
        }

        const id_pedido = result.insertId;

        // Insertar detalles del pedido si existen
        if (detalles && detalles.length > 0) {
            const queryDetails = `
            INSERT INTO detalles_pedidos (id_pedido, id_producto, cantidad, precio_unitario) 
            VALUES ?`;

            const detailsValues = detalles.map((detalle) => [
                id_pedido,
                detalle.id_producto,
                detalle.cantidad,
                detalle.precio_unitario,
            ]);

            db.query(queryDetails, [detailsValues], (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al crear los detalles del pedido', error: err });
                }
                res.status(201).json({ message: 'Pedido y detalles creados exitosamente', id_pedido });
            });
        } else {
            res.status(201).json({ message: 'Pedido creado exitosamente', id_pedido });
        }
    });
};

// Actualizar el estado de un pedido
exports.updateOrderStatus = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_pedido } = req.params;
    const { estado_pedido } = req.body;

    const query = `
    UPDATE pedidos 
    SET estado_pedido = ?, fecha_real_entrega = CASE WHEN ? = 'entregado' THEN NOW() ELSE NULL END 
    WHERE id_pedido = ?`;

    db.query(query, [estado_pedido, estado_pedido, id_pedido], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el pedido', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json({ message: 'Estado del pedido actualizado exitosamente' });
    });
};

// Eliminar un pedido
exports.deleteOrder = (req, res) => {
    const { id_pedido } = req.params;

    // Primero eliminar detalles del pedido
    const queryDeleteDetails = `DELETE FROM detalles_pedidos WHERE id_pedido = ?`;
    db.query(queryDeleteDetails, [id_pedido], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar los detalles del pedido', error: err });
        }

        // Luego eliminar el pedido
        const queryDeleteOrder = `DELETE FROM pedidos WHERE id_pedido = ?`;
        db.query(queryDeleteOrder, [id_pedido], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al eliminar el pedido', error: err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }
            res.status(200).json({ message: 'Pedido eliminado exitosamente' });
        });
    });
};

// Obtener detalles de un pedido
exports.getOrderDetails = (req, res) => {
    const { id_pedido } = req.params;

    const query = `
    SELECT dp.id_detalle, p.nombre AS producto, dp.cantidad, dp.precio_unitario 
    FROM detalles_pedidos dp
    JOIN productos p ON dp.id_producto = p.id_producto
    WHERE dp.id_pedido = ?`;

    db.query(query, [id_pedido], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los detalles del pedido', error: err });
        }
        res.status(200).json(results);
    });
};

// Obtener pedidos por cliente
exports.getOrdersByCustomer = (req, res) => {
    const { id_usuario } = req.params;

    if (!id_usuario) {
        return res.status(400).json({ message: 'El ID de usuario es obligatorio' });
    }

    const query = `
    SELECT id_pedido, total_cantidad_pinatas, total_por_cobrar, fecha_generacion, fecha_esperada_entrega, estado_pedido 
    FROM pedidos 
    WHERE id_usuario = ?`;

    db.query(query, [id_usuario], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los pedidos del cliente', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron pedidos para este cliente' });
        }

        res.status(200).json(results);
    });
};
