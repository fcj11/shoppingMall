const express = require('express');
const router = express.Router();
const userTable = require( '../router_handler/userTable.js')

router.get('/user',userTable.getUserTable)
router.post('/user/editUser',userTable.editUser)
router.post('/user/newlyAdded',userTable.newlyAdded)
router.post('/user/deleteUser',userTable.deleteUser)

module.exports = router;