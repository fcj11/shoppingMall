const express = require('express');
const router = express.Router();
const ShoppingTable = require('../router_handler/shoppingTable');

router.get('/getShopping', ShoppingTable.getShopping)
router.post('/queryShopping', ShoppingTable.queryShopping)
router.post('/add', ShoppingTable.addShopping)
router.post('/delete', ShoppingTable.deleteShopping)

module.exports = router; //exporting the router