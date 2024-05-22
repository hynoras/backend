const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getAllProduct', productController.retrieveAllProduct);
router.post('/addProduct', productController.addProduct);
router.get('/:id', productController.retrieveOneProductById);

module.exports = router;