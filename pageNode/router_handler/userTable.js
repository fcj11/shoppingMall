const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.getUserTable = (req, res) => {
    const sql = `select * from userTable_page where is_delete = 0`
    console.log(res);
    db.query(sql, (err, results) => {
        // console.log(results);
        if (err) return res.cc(err)
        // if (results.length !== 1) return res.cc('获取用户列表失败')
        return res.cc(results,0)
})

}
exports.editUser = (req , res)=>{
    console.log(req.body);
    const sql = `update userTable_page set ? where id=?`
     db.query(sql,[req.body,req.body.id],(err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改用户失败')
        if(req.body.password === '') return res.cc('请输入密码')
        return res.cc('修改成功',0)
     })
}
exports.newlyAdded = (req,res)=>{
    // 查重
    const sql = `select * from userTable_page where username=?`
    db.query(sql,req.body.username,(err, results) => {
        if(err){
            console.log(err);
            // return res.send({status:1,msg:'用户名已存在'})
            return res.cc(err)
        }
        // 判读用户名大于0
        if(results.length > 0){
            // return res.send({status:1,msg:'用户名被占用'})
            return res.cc('用户名被占用')
        }
        // 加密密码
        req.body.password = bcrypt.hashSync(req.body.password,10)
        const sql1 = `insert into userTable_page set ?`
        db.query(sql1,{
            username:req.body.username,
            password: req.body.password,
            age:req.body.age,
            gender:req.body.gender,
            date:req.body.date,
        },(err,results)=>{
            if(err){
                return res.cc(err)
            }
            // 判断影响行数是否为1
            // if(res.affectedRows !== 1)return res.cc('注册用户失败')
        })
        return res.cc('注册成功',0)
})
}
exports.deleteUser = (req ,res)=>{
    console.log(req);
    const sql = `select * from userTable_page where id=?`
    db.query(sql,req.body.id,(err, results)=>{
            if(err)return res.cc(err)
            const sql1 = `update userTable_page set is_delete=1 where id=?`
            db.query(sql1,req.body.id,(err,results)=>{
                if(err){
                    return res.cc(err)
                }
        })
        return res.cc('删除成功',0)

    })

}