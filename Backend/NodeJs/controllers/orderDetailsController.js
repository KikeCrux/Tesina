const { validationResult } = require('express-validator');
const db = require('../config/db');

// Get all order details
exports.getAllOrderDetails = (req, res) => {
    const query = 'SELECT * FROM order_details';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching order details', error: err });
        }
        res.status(200).json(results);
    });
};

// Get order details by order ID
exports.getOrderDetailsByOrderId = (req, res) => {
    const { order_id } = req.params;

    if (!order_id) {
        return res.status(400).json({ message: 'Order ID is required' });
    }

    const query = `
        SELECT * 
        FROM order_details 
        WHERE order_id = ?`;

    db.query(query, [order_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching order details', error: err });
        }
        res.status(200).json(results);
    });
};

// Create a new order detail
exports.createOrderDetail = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { order_id, package_id, component_id, product_id, quantity, unit_price, total_price } = req.body;

    const query = `
        INSERT INTO order_details (order_id, package_id, component_id, product_id, quantity, unit_price, total_price) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [order_id, package_id || null, component_id || null, product_id || null, quantity, unit_price, total_price], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating order detail', error: err });
        }
        res.status(201).json({ message: 'Order detail created successfully', detail_id: result.insertId });
    });
};

// Update an order detail
exports.updateOrderDetail = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { detail_id } = req.params;
    const { quantity, unit_price, total_price } = req.body;

    const query = `
        UPDATE order_details 
        SET quantity = ?, unit_price = ?, total_price = ? 
        WHERE detail_id = ?`;

    db.query(query, [quantity, unit_price, total_price, detail_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating order detail', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        res.status(200).json({ message: 'Order detail updated successfully' });
    });
};

// Delete an order detail
exports.deleteOrderDetail = (req, res) => {
    const { detail_id } = req.params;

    const query = `
        DELETE FROM order_details 
        WHERE detail_id = ?`;

    db.query(query, [detail_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting order detail', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        res.status(200).json({ message: 'Order detail deleted successfully' });
    });
};
