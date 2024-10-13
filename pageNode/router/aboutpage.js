const express = require('express');
const router = express.Router();
const aboutpage = require('../router_handler/aboutpage');

router.get('/getPage', aboutpage.getAbout);
module.exports = router; 