const express = require('express');
const { body, param } = require('express-validator');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Obtener todos los pedidos
router.get('/', orderController.getOrders);

// Crear un pedido
router.post(
    '/',
    [
        body('id_usuario').isInt().withMessage('El ID de usuario es obligatorio y debe ser un número'),
        body('total_cantidad_pinatas').isInt({ min: 1 }).withMessage('La cantidad total debe ser un número positivo'),
        body('total_por_cobrar').isFloat({ min: 0 }).withMessage('El total por cobrar debe ser un número positivo'),
        body('fecha_esperada_entrega').optional().isISO8601().withMessage('La fecha de entrega debe ser válida')
    ],
    orderController.createOrder
);

// Actualizar el estado de un pedido
router.put(
    '/:id_pedido',
    [
        param('id_pedido').isInt().withMessage('El ID del pedido debe ser un número'),
        body('estado_pedido').isIn(['pendiente', 'entregado']).withMessage('El estado del pedido no es válido')
    ],
    orderController.updateOrderStatus
);

// Eliminar un pedido
router.delete(
    '/:id_pedido',
    [
        param('id_pedido').isInt().withMessage('El ID del pedido debe ser un número')
    ],
    orderController.deleteOrder
);

// Obtener detalles de un pedido
router.get(
    '/:id_pedido/detalles',
    [
        param('id_pedido').isInt().withMessage('El ID del pedido debe ser un número')
    ],
    orderController.getOrderDetails
);

// Obtener pedidos por cliente
router.get(
    '/cliente/:id_usuario',
    [
        param('id_usuario').isInt().withMessage('El ID del usuario debe ser un número')
    ],
    orderController.getOrdersByCustomer
);

module.exports = router;