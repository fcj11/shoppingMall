const db = require('../db/index')
const fs = require('fs');
const path = require('path');

exports.getAbout = (req, res) => {
    const aboutPage = [
        {
            total:'',
            imperfect:'',
            Completed:''
        }
    ]
    const sql = 'select * from shoppingOrder'
    db.query(sql, (err, results) => {
        aboutPage[0].total = results.length
    })
    const sql1 = `select * from shoppingOrder where state=0`
    db.query(sql1, (err, results) => {
            aboutPage[0].imperfect = results.length 
    })
    const sql2 = `select * from shoppingOrder where state=4`
    db.query(sql2, (err, results) => {
            aboutPage[0].Completed = results.length
            console.log(aboutPage);
            return res.send({
                status: 0,
                message: '获取数据成功',
                data: aboutPage
            })
    })
}