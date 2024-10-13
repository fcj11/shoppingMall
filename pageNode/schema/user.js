// 导入验证模块
const joi = require('joi')

// 用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/)

exports.reg_login_schema = {
    // 数据都在body存着
    body: {
        username,
        password
    }
}