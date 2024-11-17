const express = require('express');
const { body, query } = require('express-validator');
const productController = require('../controllers/productController');

const router = express.Router();

// Obtener todos los productos
router.get(
    '/productos',
    [
        query('id_usuario').optional().isInt().withMessage('El ID de usuario debe ser un número'),
        query('tipo_usuario').optional().isIn(['mayoreo', 'menudeo']).withMessage('Tipo de usuario no válido')
    ],
    productController.getProducts
);

// Crear un nuevo producto
router.post(
    '/productos',
    [
        body('nombre').notEmpty().withMessage('El nombre del producto es obligatorio'),
        body('precio_menudeo').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
        body('imagen_url').optional().isURL().withMessage('La URL de la imagen no es válida')
    ],
    productController.createProduct
);

// Actualizar un producto existente
router.put(
    '/productos/:id_producto',
    [
        body('nombre').optional().notEmpty().withMessage('El nombre del producto no puede estar vacío'),
        body('precio_menudeo').optional().isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
        body('imagen_url').optional().isURL().withMessage('La URL de la imagen no es válida')
    ],
    productController.updateProduct
);

// Eliminar un producto
router.delete(
    '/productos/:id_producto',
    productController.deleteProduct
);

// Asignar precio personalizado a un cliente de mayoreo
router.post(
    '/productos/precios-mayoreo',
    [
        body('id_usuario').isInt().withMessage('El ID del usuario es obligatorio y debe ser un número'),
        body('id_producto').isInt().withMessage('El ID del producto es obligatorio y debe ser un número'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo')
    ],
    productController.assignWholesalePrice
);

// Obtener precios personalizados de un cliente de mayoreo
router.get(
    '/productos/precios-mayoreo',
    [
        query('id_usuario').isInt().withMessage('El ID del usuario es obligatorio y debe ser un número')
    ],
    productController.getWholesalePrices
);

module.exports = router;
