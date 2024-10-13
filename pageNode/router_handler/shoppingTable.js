const db = require('../db/index')
const fs = require('fs');
const path = require('path');

const { encode, decode } = require('base64-utils');
exports.getShopping = (req, res) =>{
    const sql = `select * from formLabelAlign`
    db.query(sql, (err, results) => {
        if(results.length != 0){
        // 循环处理将数据库中的img Buffer对象转为字符串
        const category = []
        category.push(results[0].category)
        console.log(results);

        results.forEach(item => {
            // 将img字段从Buffer对象转为字符串
            if(item.img != null){
                
           
            const imgBuffer = Buffer.from(item.img);
            // console.log(imgBuffer);
            // 将img字段从字符串转为JSON对象
            item.img = imgBuffer.toString('utf8');
            // console.log(item.img);
            // 将img字段从JSON对象转为数组
            item.img = JSON.parse( item.img );
            // console.log(item.img);
            // 获取数组中的第一个元素
            item.img = item.img[0]
            // console.log(item.img);
            // 获取商品图片的绝对路径
        

            // try{
            //     dir = path.join(__dirname, '../', item.img)
            //      // 读取商品图片文件的内容
            //     const readStream = fs.readFileSync(dir)
            //     // 将商品图片文件的内容转为base64字符串
            //     base64 = readStream.toString('base64')
            //     // 将base64字符串赋值给img字段
            //     item.img = base64;
            // }catch(err){
            //     item.img = ''
            //     console.error('捕获到异常:', error);
            // }
            // 读取商品图片文件的内容
            const dir = path.join(__dirname, '../','public/image/', item.img)
            const dirImg = path.join('/image/',item.img)
            // console.log(dir);
            const errDir = path.join(__dirname,'../','public/images/kongtupian.jpg')
            const errDirImg = path.join('/images/','/kongtupian.jpg')

            // console.log(errDir);
            const readStream = ''
            const img = ''
            try{
                this.readStream = fs.readFileSync(dir)
                this.img = dirImg
                // console.log(this.img,'1');

                // console.log(this.readStream);
            }catch(err){
                // console.log(dir);
                this.readStream =fs.readFileSync(errDir)
                this.img = errDirImg
                // console.log(this.img,'2');
                // console.log(this.readStream);

                // console.error('读取文件失败:');
            }
            // console.log(this.readStream);
            // const readStream = fs.readFileSync(dir)
            // 将商品图片文件的内容转为base64字符串
            // const base64 = this.readStream.toString('base64')
            // const base64 = fs.readFileSync(dir, 'base64') // 文件流并转 base64
            // 将base64字符串赋值给img字段
            item.img = this.img;
            // console.log(item.img,'item.img');
        }   
        });
        if (err) return res.cc(err)
        return res.cc(results,0)
        }else{
            return res.cc(results,0)
        }
    })
}
exports.queryShopping = (req, res)=>{
    console.log(req.body.id);
    const sql = `select * from formLabelAlign where id = ${req.body.id}`
    db.query(sql, (err, results) => {
        let img = results[0].img
        // 判断是否有照片
        if(img != null){
            const imgBuffer = Buffer.from(img);
            img = imgBuffer.toString('utf8');
            img = JSON.parse( img );
            let box =[]
            img.forEach(item=>{
                item = '/image/'+item
                box.push(item)
            })
            results[0].img = box
            console.log(results[0].category);
            let category = results[0].category
            let values = category.split(',');
            let boxCategory = []
    
            let array = values.map(function(item) {
                // item = JSON.stringify(item)
                console.log(item);
                boxCategory.push(item)
            });
            console.log(boxCategory);
            results[0].category = boxCategory
        }else{
            console.log(results[0].category);
            let category = results[0].category
            let values = category.split(',');
            let boxCategory = []
    
            let array = values.map(function(item) {
                // item = JSON.stringify(item)
                console.log(item);
                boxCategory.push(item)
            });
            console.log(boxCategory);
            results[0].category = boxCategory
        }
       
       
        return res.cc(results,0)
    })
}
exports.addShopping = (req, res) => {
    console.log(req.body ,'img');
    let img = req.body.img
    // console.log(this.img,'img');
    const imgString = JSON.stringify(req.body.img);
    // console.log(imgString,'imgString');
    // let no = JSON.stringify('0')
    //     if(imgString.trim() == no.trim()){
    //         req.body.img = []
    //         // console.log(req.body.img);
    //         req.body.img.push('/kongtupian.jpg')
    //         // console.log(req.body.img,'img');
    //     }
        
        console.log(req.body);
    // 判断id是否为空
    if (req.body.id ==='') {
        // console.log('JSON.stringify');
        // console.log(JSON.stringify(req.body.img));
        // 为空执行sql添加表单
        const sql = `insert into formLabelAlign set ?`
        // const imgJson = JSON.stringify(req.body.img)
        // console.log(imgJson);
        // const imgBuffer = Buffer.from(imgJson);
        // console.log(imgBuffer);
        // const imgStr = imgBuffer.toString('utf8');
        // console.log(imgStr);
        // const imgParse = JSON.parse(imgStr);
        db.query(sql, {
            name:req.body.name,
            region:req.body.region,
            type:req.body.type,
            price:req.body.price,
            number:req.body.number,
            radio:req.body.radio,
            category:req.body.category,
            detailed:req.body.detailed,
            img:JSON.stringify(req.body.img)
        }, (err, results) => {
            // console.log(results);
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加失败')
            return res.cc(results,0)
    })
    }else{
        // 不为空执行sql更新表单
        const sql = `update formLabelAlign set ? where id=?`
        req.body.category =req.body.category.join(', ');
        console.log(req.body.category)
       console.log(req.body.img);
       let newImg = []
       req.body.img.forEach(item =>{
            newImg.push(item.replace(/^http(s)?:\/\/localhost:5173\/image\//, ''))
          })
          req.body.img = newImg
        req.body.img = JSON.stringify(req.body.img)
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新失败')
            return res.cc(results,0)
        }
    )
    }
    // 自检 每次添加了商品后 前端照片数组自动上传防止照片冗余
    // 检查image内的图片是否和数据库中的图片一致
    // 如果不一致则删除image内的图片
    setTimeout(()=>{
    // const imgUrl = `select img from formLabelAlign`
    const imgUrl = `SELECT * FROM formLabelAlign WHERE img IS NOT NULL;`
    db.query(imgUrl ,(err,results)=>{
        const mysqlUrl = []
        console.log(results,'results');
        results.forEach(item =>{
            // 转字符串转json转数组
            item.img =  Buffer.from(item.img)
            // console.log( item.img);
            item.img = item.img.toString('utf8');
            // console.log( item.img);
            item.img = JSON.parse(item.img);
            // console.log( item.img);
            item.img.forEach(item =>{
                // 获取照片的绝对路径让入mysqlUrl数组
                item = path.join(__dirname, '../','public/image/',item);
                // console.log(item);
                mysqlUrl.push(item)
            })
        })
        // 获取服务器中照片文件夹的绝对路径
        const folderPath = path.join(__dirname, '../','public/image');
        // console.log(folderPath);
        // 读取文件夹中的所有文件
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }
            const imageUrl = []
            // 特定系统下会出现.DS_Store文件
            // 过滤掉.DS_Store文件
            let index = '.DS_Store'
            files = files.filter(item => item !== index)
            // 拼接路径为绝对路径并放入imageUrl
            files.forEach(file => {
                // console.log(file,'file');
                const dir = path.join(__dirname, '../', 'public/image',file)
                // console.log(dir);
                imageUrl.push(dir)
              });
            //   将服务器中存在于数据库中的值删除剩下的就是不存在于数据库中的值
            let imageUrlTemporary = imageUrl.filter(item => mysqlUrl.includes(item))
            //   将服务器中存在于数据库中的值删除剩下的就是不存在于数据库中的值 
            let resultImageUrl = imageUrl.filter(item => !imageUrlTemporary.includes(item))
            //   删除服务器中不存在于数据库中的值
            resultImageUrl.forEach(item =>{
                fs.unlink(item,(err)=>{
                    if (err) {
                        console.error('删除照片时发生错误:', err);
                      } else {
                        console.log('照片已成功删除');
                      }
                })
            })    
        })
    })
})
    
}
exports.deleteShopping = (req,res)=>{   
    const sql = `select from formLabelAlign where id=?`
    // console.log(req.body.id);
    db.query(sql, req.body.id, (err, results) => {
        // console.log(req);
        const sql = `select img from formLabelAlign where id=${req.body.id}`
        db.query(sql, (err, results) => {
            // console.log(results[0].img);
            const imgBuffer = Buffer.from(results[0].img);
            // console.log(imgBuffer);
            results[0].img = imgBuffer.toString('utf8');
            // console.log(results[0].img);
            results[0].img = JSON.parse(results[0].img);
            // console.log(results[0].img[0],'parse');

            const dir = path.join(__dirname, '../', results[0].img[0])
            const images = path.join(__dirname, '../', 'public/images/kongtupian.jpg ')
            
            // console.log(dir);
            // console.log(images);
            fs.access(dir, fs.constants.F_OK, (err) => {
                if (err) {
                  console.log('文件不存在');
                //   直接删除数据库值
                    const delect = `delete from formLabelAlign where id=${req.body.id}`
                    db.query(delect, (err, results) => {
                        if (err) return res.cc(err)
                            if (results.affectedRows !== 1) return res.cc('删除失败')
                            return res.cc(results,0)
                    })
                } else {
                //   console.log('文件存在');
                //   console.log(dir.trim() == images.trim());
                    if(dir.trim() != images.trim()){
                        fs.unlink(dir,(err)=>{
                            if (err) {
                                return res.cc('删除照片时发生错误:', err);
                                // console.error('删除照片时发生错误:', err);
                              } else {
                                // console.log('照片已成功删除');
                                const delect = `delete from formLabelAlign where id=${req.body.id}`
                                db.query(delect, (err, results) => {
                                    if (err) return res.cc(err)
                                    if (results.affectedRows !== 1) return res.cc('删除失败')
                                    return res.cc(results,0)
                                })
                              }
                          })
                    }else{
                        const delect = `delete from formLabelAlign where id=${req.body.id}`
                            db.query(delect, (err, results) => {
                                if (err) return res.cc(err)
                                    if (results.affectedRows !== 1) return res.cc('删除失败')
                                    return res.cc(results,0)
                            })
                    }
                }
            });
        })
    })
}

