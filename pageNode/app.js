// 导入express模块
const express = require('express');
const joi = require('joi')

// 创建 express 的服务器实例
const app = express();
// 配置cors 
const cors = require('cors');
// 配置静态
app.use(express.static("./public"))
// 解析post请求数据
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());
// 配置解析表单数据的中间件解析www-urlencoded格式的表单数据
// app.use(express.urlencoded({ extended: false }));
app.use((req,res,next)=>{
    // 默认status=1 为失败 err可以错误对象也可以是错误的字符串
    res.cc = function(err,status=1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})
const userRouter = require('./router/user')
app.use('/api', userRouter)
const aboutRouter = require('./router/userTable')
app.use('/about', aboutRouter)
const imgTable = require('./router/imgTable')
app.use("/imgTable", imgTable)
const shoppingTable = require('./router/shoppingTable')
app.use("/shopping", shoppingTable)
const shoppingOrder = require('./router/shoppingOrder')
app.use("/Order", shoppingOrder)
const aboutpage = require('./router/aboutpage')
app.use("/aboutpage", aboutpage)
app.use(express.static(__dirname + '/public'))
// 路由前配置中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({path:[/^\/api\//]}))

app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError){
        return res.cc(err)
    }
    // token认证失败
    if(err.name === 'UnauthorizedError')return res.cc('身份认证失败')
    // 未知错误
    res.cc(err)
})

app.listen(5173, () => {
    console.log('api server is running at http://127.0.0.1:5173');
})