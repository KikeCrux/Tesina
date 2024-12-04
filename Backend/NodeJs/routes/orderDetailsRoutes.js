const express = require('express');
const { body, param } = require('express-validator');
const orderDetailsController = require('../controllers/orderDetailsController');

const router = express.Router();

// Get all order details
router.get('/all', orderDetailsController.getAllOrderDetails);

// Get order details by order ID
router.get(
    '/:order_id',
    param('order_id').isInt().withMessage('Order ID must be a number.'),
    orderDetailsController.getOrderDetailsByOrderId
);

// Create a new order detail
router.post(
    '/',
    [
        body('order_id').isInt().withMessage('Order ID is required and must be a number.'),
        body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive number.'),
        body('unit_price').isFloat({ min: 0 }).withMessage('Unit price must be a positive number.'),
        body('total_price').isFloat({ min: 0 }).withMessage('Total price must be a positive number.'),
    ],
    orderDetailsController.createOrderDetail
);

// Update an order detail
router.put(
    '/:detail_id',
    [
        param('detail_id').isInt().withMessage('Detail ID must be a number.'),
        body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive number.'),
        body('unit_price').optional().isFloat({ min: 0 }).withMessage('Unit price must be a positive number.'),
        body('total_price').optional().isFloat({ min: 0 }).withMessage('Total price must be a positive number.'),
    ],
    orderDetailsController.updateOrderDetail
);

// Delete an order detail
router.delete(
    '/:detail_id',
    param('detail_id').isInt().withMessage('Detail ID must be a number.'),
    orderDetailsController.deleteOrderDetail
);

module.exports = router;
