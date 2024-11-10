const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/productos', productController.getProducts);

module.exports = router;
