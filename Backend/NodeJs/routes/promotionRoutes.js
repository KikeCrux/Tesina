const express = require('express');
const { body, query } = require('express-validator');
const promotionController = require('../controllers/promotionController');

const router = express.Router();

// Obtener todas las promociones
router.get('/promotions', promotionController.getPromotions);

// Crear una nueva promoción
router.post(
    '/promotions',
    [
        body('nombre_promocion').notEmpty().withMessage('El nombre de la promoción es obligatorio'),
        body('descuento_monto').optional().isFloat({ min: 0 }).withMessage('El descuento debe ser un número positivo'),
        body('fecha_inicio').optional().isISO8601().withMessage('La fecha de inicio debe ser válida'),
        body('fecha_fin').optional().isISO8601().withMessage('La fecha de fin debe ser válida'),
    ],
    promotionController.createPromotion
);

// Actualizar una promoción
router.put(
    '/promotions/:id_promocion',
    [
        body('nombre_promocion').optional().notEmpty().withMessage('El nombre de la promoción no puede estar vacío'),
        body('descuento_monto').optional().isFloat({ min: 0 }).withMessage('El descuento debe ser un número positivo'),
        body('fecha_inicio').optional().isISO8601().withMessage('La fecha de inicio debe ser válida'),
        body('fecha_fin').optional().isISO8601().withMessage('La fecha de fin debe ser válida'),
    ],
    promotionController.updatePromotion
);

// Eliminar una promoción
router.delete('/promotions/:id_promocion', promotionController.deletePromotion);

// Obtener promociones activas
router.get(
    '/promotions/active',
    [
        query('id_producto').optional().isInt().withMessage('El ID del producto debe ser un número'),
        query('id_usuario').optional().isInt().withMessage('El ID del usuario debe ser un número'),
    ],
    promotionController.getActivePromotions
);

module.exports = router;
