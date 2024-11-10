const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login',
    [
        body('correo').isEmail().withMessage('Correo no válido'),
        body('contrasena').notEmpty().withMessage('La contraseña es obligatoria')
    ],
    authController.login
);

router.post('/register',
    [
        body('correo').isEmail().withMessage('Correo no válido'),
        body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('nombre_cliente').notEmpty().withMessage('El nombre es obligatorio'),
        body('telefono').isMobilePhone().withMessage('El teléfono no es válido'),
        body('tipo_usuario').isIn(['mayoreo', 'menudeo']).withMessage('Tipo de usuario no válido')
    ],
    authController.register
);

module.exports = router;
