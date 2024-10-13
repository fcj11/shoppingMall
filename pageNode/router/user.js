const express = require('express');
// 创建路由对象
const router = express.Router();
// 导入用户路由处理函数模块
const user_handler = require('../router_handler/user');
const expressJoi = require('@escook/express-joi')
const {reg_login_schema , update_userinfo_schema} = require('../schema/user')

router.post('/login', user_handler.login);
router.post('/down', user_handler.down);
router.post('/registered',expressJoi(reg_login_schema), user_handler.regUser);
router.post('/userLogin', expressJoi(reg_login_schema),user_handler.userLogin);

module.exports = router;