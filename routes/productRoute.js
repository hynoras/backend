const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getAllProduct', productController.retrieveAllProduct);
router.post('/addProduct', productController.addProduct);

module.exports = router;