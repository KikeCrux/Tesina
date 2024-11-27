const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');
const { body, param } = require('express-validator');

router.get(
    '/:id_paquete',
    param('id_paquete').isInt().withMessage('El ID del paquete debe ser un número.'),
    componentController.getComponentsByPackage
);

router.post(
    '/',
    [
        body('id_paquete').isInt().withMessage('El ID del paquete es obligatorio y debe ser un número.'),
        body('tipo_componente').notEmpty().withMessage('El tipo de componente es obligatorio.'),
        body('nombre_componente').notEmpty().withMessage('El nombre del componente es obligatorio.'),
        body('cantidad').isInt({ min: 1 }).withMessage('La cantidad debe ser un número positivo.')
    ],
    componentController.addComponentToPackage
);

router.put(
    '/:id_componente',
    [
        param('id_componente').isInt().withMessage('El ID del componente debe ser un número.'),
        body('tipo_componente').optional().notEmpty().withMessage('El tipo de componente no puede estar vacío.'),
        body('nombre_componente').optional().notEmpty().withMessage('El nombre del componente no puede estar vacío.'),
        body('cantidad').optional().isInt({ min: 1 }).withMessage('La cantidad debe ser un número positivo.')
    ],
    componentController.updateComponent
);

router.delete(
    '/:id_componente',
    param('id_componente').isInt().withMessage('El ID del componente debe ser un número.'),
    componentController.deleteComponent
);


module.exports = router;
