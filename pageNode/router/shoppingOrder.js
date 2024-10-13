const express = require('express');
const router = express.Router();
const shoppingOrder = require('../router_handler/shoppingOrder');

router.get('/shoppingOrder', shoppingOrder.getShoppingOrder);
router.post('/queryShoppingOrder', shoppingOrder.queryShoppingOrder);

module.exports = router; //exporting the router