const express = require('express');
const { body, param } = require('express-validator');
const packageController = require('../controllers/packageController');

const router = express.Router();

// Obtener todos los paquetes
router.get(
    '/',
    packageController.getPackages
);

// Crear un nuevo paquete
router.post(
    '/',
    [
        body('nombre_paquete').notEmpty().withMessage('El nombre del paquete es obligatorio'),
        body('precio_paquete').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
        body('descripcion').optional().isString().withMessage('La descripción debe ser un texto'),
        body('decoracion').optional().isString().withMessage('La decoración debe ser un texto'),
    ],
    packageController.createPackage
);

// Actualizar un paquete existente
router.put(
    '/:id_paquete',
    [
        param('id_paquete').isInt().withMessage('El ID del paquete debe ser un número válido'),
        body('nombre_paquete').optional().notEmpty().withMessage('El nombre del paquete no puede estar vacío'),
        body('precio_paquete').optional().isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
        body('descripcion').optional().isString().withMessage('La descripción debe ser un texto'),
        body('decoracion').optional().isString().withMessage('La decoración debe ser un texto'),
    ],
    packageController.updatePackage
);

// Eliminar un paquete
router.delete(
    '/:id_paquete',
    [
        param('id_paquete').isInt().withMessage('El ID del paquete debe ser un número válido'),
    ],
    packageController.deletePackage
);

module.exports = router;
