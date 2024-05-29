const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/generateOrder/:cartId', orderController.generateOrder);

router.delete('/deleteOrder/:ordId', orderController.deleteOrder)

module.exports = router;
