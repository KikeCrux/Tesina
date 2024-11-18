const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');

router.get('/:id_paquete', componentController.getComponentsByPackage);
router.post('/', componentController.addComponentToPackage);
router.put('/:id_componente', componentController.updateComponent);
router.delete('/:id_componente', componentController.deleteComponent);

module.exports = router;
