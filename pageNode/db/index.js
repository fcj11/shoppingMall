const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Fu789456123',
    database: 'Backstage'
})

// db.query('select * from user_page',(err,result)=>{
//     if(err) return console.log(err.message);
//     console.log(result);
// })

module.exports = db;
