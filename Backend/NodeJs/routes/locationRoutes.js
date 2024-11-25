const express = require('express');
const { body, param, query } = require('express-validator');
const locationController = require('../controllers/locationController');

const router = express.Router();

// Obtener ubicaciones
router.get(
    '/',
    query('id_usuario').optional().isInt().withMessage('El ID de usuario debe ser un número'),
    locationController.getLocations
);

// Crear una nueva ubicación
router.post(
    '/',
    [
        body('tipo_ubicacion').isIn(['entrega', 'recogida']).withMessage('El tipo de ubicación debe ser "entrega" o "recogida"'),
        body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
        body('id_usuario').optional().isInt().withMessage('El ID de usuario debe ser un número')
    ],
    locationController.createLocation
);

// Actualizar una ubicación existente
router.put(
    '/:id_ubicacion',
    [
        param('id_ubicacion').isInt().withMessage('El ID de la ubicación debe ser un número'),
        body('tipo_ubicacion').isIn(['entrega', 'recogida']).withMessage('El tipo de ubicación debe ser "entrega" o "recogida"'),
        body('direccion').notEmpty().withMessage('La dirección es obligatoria')
    ],
    locationController.updateLocation
);

// Eliminar una ubicación
router.delete(
    '/:id_ubicacion',
    param('id_ubicacion').isInt().withMessage('El ID de la ubicación debe ser un número'),
    locationController.deleteLocation
);

module.exports = router;
