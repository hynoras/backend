const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const cartDetailController = require('../controllers/cartDetailController');
const auth = require('../middleware/auth');

router.get('/getCartId', auth, cartController.getCartByUserId);
router.get('/getCartDetailById/:cartId', cartDetailController.retrieveCartInfoById);

router.post('/addToCart/:cartId/:prodId', cartDetailController.addToCart);

module.exports = router;
