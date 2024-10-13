const db = require('../db/index')
const fs = require('fs');
const path = require('path');

exports.getShoppingOrder = (req, res) => {
    const sql = 'select * from shoppingOrder'
    db.query(sql, (err, results) => {
        console.log(results);
        console.log(err);
        
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('获取订单失败')
        return res.send({
            status: 0,
            message: '获取订单成功',
            data: results
        })
    })
}
exports.queryShoppingOrder = (req, res) =>{
    console.log(req.body); 
    const Array =[]  
    if(req.body.orderNumber == '' && req.body.state == '' && req.body.completionTime == '' && req.body.category == ''){
        const sql = 'select * from shoppingOrder'
    db.query(sql, (err, results) => {
        console.log(results);
        console.log(err);
        
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('获取订单失败')
        return res.send({
            status: 0,
            message: '获取订单成功',
            data: results
        })
    })
    }else{
        if(req.body.orderNumber != ''){
            Array.push(`orderNumber like '%${req.body.orderNumber}%'`)
        }
        if(req.body.state != ''){
            switch (req.body.state) {
                case '未完成':
                    req.body.state = 0;
                    Array.push(`state like '%${req.body.state}%'`)
                  break;
                case '未支付':
                    req.body.state = 1;
                    Array.push(`state like '%${req.body.state}%'`)
                  break;
                case '运输中':
                    req.body.state = 2;
                    Array.push(`state like '%${req.body.state}%'`)
                  break;
                case '未评价':
                    req.body.state = 3;
                    Array.push(`state like '%${req.body.state}%'`)
                  break;
                case '已完成':
                    req.body.state = 4;
                    Array.push(`state like '%${req.body.state}%'`)
                  break;
                default:
                    req.body.state = 5;
              }
        }
        if(req.body.completionTime != ''){
            // Array.push(`completionTime like '%${req.body.completionTime}%'`)
            Array.push(`DATE(completionTime) = '${req.body.completionTime}' AND TIME(completionTime) BETWEEN '00:00:00' AND '23:59:59'`)
        } 
        if(req.body.category != ''){
            Array.push(`category like '%${req.body.category}%'`)
        }
        console.log(Array);
        const sql = `select * from shoppingOrder where ${Array.join(' and ')}`
        db.query(sql, (err, results) => {
            console.log(results,'results');
            console.log(err,'err');
            if (err) return res.cc(err)
            // if (results.length === 0) return res.cc('获取订单失败1')
            return res.send({
                status: 0,
                message: '获取订单成功',
                data: results
            })
            
        })
    }
    
    
    
    
}

