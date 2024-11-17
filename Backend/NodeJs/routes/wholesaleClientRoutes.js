const express = require('express');
const { body, param } = require('express-validator');
const wholesaleClientController = require('../controllers/wholesaleClientController');

const router = express.Router();

// Obtener todos los clientes de mayoreo
router.get('/clientes-mayoreo', wholesaleClientController.getWholesaleClients);

// Crear un cliente de mayoreo
router.post(
    '/clientes-mayoreo',
    [
        body('id_usuario').isInt().withMessage('El ID de usuario es obligatorio y debe ser un número'),
        body('nombre_negocio').notEmpty().withMessage('El nombre del negocio es obligatorio')
    ],
    wholesaleClientController.createWholesaleClient
);

// Actualizar un cliente de mayoreo
router.put(
    '/clientes-mayoreo/:id_cliente_mayoreo',
    [
        param('id_cliente_mayoreo').isInt().withMessage('El ID del cliente de mayoreo debe ser un número'),
        body('id_usuario').isInt().withMessage('El ID de usuario debe ser un número'),
        body('nombre_negocio').notEmpty().withMessage('El nombre del negocio es obligatorio')
    ],
    wholesaleClientController.updateWholesaleClient
);

// Eliminar un cliente de mayoreo
router.delete(
    '/clientes-mayoreo/:id_cliente_mayoreo',
    [
        param('id_cliente_mayoreo').isInt().withMessage('El ID del cliente de mayoreo debe ser un número')
    ],
    wholesaleClientController.deleteWholesaleClient
);

module.exports = router;
