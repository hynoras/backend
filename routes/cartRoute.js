const express = require('express');
const router = express.Router();
const cartDetailController = require('../controllers/cartDetailController');

// Define the route to add a product to the cart
router.post('/addToCart/:cartId/:prodId', cartDetailController.addToCart);

module.exports = router;
