const db = require('../db/index')
// 加密
const bcrypt = require('bcryptjs')
// 导入验证用户密码的规则模块
const { reg_login_schema } = require('../schema/user')
// 导入token包
const jwt = require('jsonwebtoken')
// 导入全局配置文件密钥
const config = require('../config')


exports.login = (req,res)=>{
    // 验证token
    // console.log(req.body[0]);
    const token = req.body[0].token.slice(7)
    // console.log(token);
    const sql = `select * from user_page where token = ?`
    db.query(sql,token,(err,results)=>{
        console.log(results);
        if(err){
            return res.cc(err)
        }
        if(results.length === 0){
            return res.cc('token无效')
        }
        return res.cc(results[0].username,0)
    })
}
exports.down = (req,res)=>{
    console.log(req.body[0].token);
    const token = req.body[0].token.slice(7)
    const sql = `select * from user_page where token = ?`
    db.query(sql,token,(err,results)=>{
        // console.log(results[0].token);
        if(results[0].token != ''){
            results[0].token =  ''
            // console.log(results[0]);
            const sql = `update user_page set ? where id=?`
            db.query(sql,[results[0],results[0].id],(err,results)=>{
                if (err) return res.cc(err)
                return res.cc('登出',0)
            })
        }return
    })
}
exports.regUser = (req,res)=>{
    const userinfo = req.body
    // console.log(res);
    // console.log(req.body);
    const sql = `select * from user_page where username=?`
    db.query(sql,userinfo.username,(err,results) => {
        if(err){
            // console.log(err);
            // return res.send({status:1,msg:'用户名已存在'})
            return res.cc(err)
        }
        // 判读用户名大于0
        if(results.length > 0){
            // return res.send({status:1,msg:'用户名被占用'})
            return res.cc('用户名被占用')
        }
    // TODO可以使用
        // 对用户的密码进行加密处理 bcrypt.hashSync()
        userinfo.password = bcrypt.hashSync(userinfo.password,10) 
        const sqlStr = `insert into user_page set ?`
        db.query(sqlStr,{username:userinfo.username,password:userinfo.password},(err,res)=>{
            // 判断是否成功·
        if(err){
            return res.send(err)
        }
        // 判断影响行数是否为1
        if(res.affectedRows !== 1)return res.send('注册用户失败')
        // 注册成功
        })
        return res.cc('注册成功',0)

    })
}

exports.userLogin = (req,res) => {
    const userinfo = req.body;
    // 接受表单传递来的数据
    const sql = `select * from user_page where username=?`
    console.log(req.body.username);
    const username = req.body.username
    db.query(sql,req.body.username,(err,results) => {
        if(err) return res.cc('密码错误')
        if(results.length !== 1) return res.cc('密码错误')
        // 判断密码是否正确
        // 根据输入的密码和数据库中的密码进行比较 
        const body = results
        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult) return res.cc('密码错误')
        // 生成token字符串 通过...展开运算符剔除敏感信息
        const user = {...results[0],password:''}
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        console.log(tokenStr , typeof username);
        // 将token存储在数据库
            const sql = `UPDATE user_page SET token=? WHERE username = '${username}'`
            db.query(sql,tokenStr,(err,results) => {
                console.log(body);
                    if(err) return res.cc('错误')
                    return res.cc({
                        status:0,
                        results:body[0].username,
                        message:'登录成功',
                        token: 'Bearer '+tokenStr
                    })
            })
            // if(err) return res.cc('错误')
                        // return res.cc({
                        //     status:0,
                        //     message:'登录成功',
                        //     token: 'Bearer '+tokenStr
                        // })
    })


}