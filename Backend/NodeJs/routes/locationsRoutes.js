const express = require('express');
const { body, param } = require('express-validator');
const locationsController = require('../controllers/locationsController');

const router = express.Router();

// Obtener todas las ubicaciones
router.get('/all', locationsController.getAllLocations);

// Obtener ubicaciones por usuario
router.get(
    '/user/:user_id',
    param('user_id').isInt().withMessage('El ID del usuario debe ser un número.'),
    locationsController.getLocationsByUser
);

// Crear una nueva ubicación
router.post(
    '/',
    [
        body('tipo_ubicacion').isIn(['casa', 'oficina']).withMessage('El tipo de ubicación no es válido.'),
        body('direccion').notEmpty().withMessage('La dirección es obligatoria.'),
        body('id_usuario').isInt().withMessage('El ID del usuario debe ser un número.')
    ],
    locationsController.createLocation
);

// Actualizar una ubicación
router.put(
    '/:location_id',
    [
        param('location_id').isInt().withMessage('El ID de la ubicación debe ser un número.'),
        body('tipo_ubicacion').optional().isIn(['casa', 'oficina']).withMessage('El tipo de ubicación no es válido.'),
        body('direccion').optional().notEmpty().withMessage('La dirección no puede estar vacía.')
    ],
    locationsController.updateLocation
);

// Eliminar una ubicación
router.delete(
    '/:location_id',
    param('location_id').isInt().withMessage('El ID de la ubicación debe ser un número.'),
    locationsController.deleteLocation
);

module.exports = router;
