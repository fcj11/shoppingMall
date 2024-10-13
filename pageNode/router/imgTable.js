
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = new express();

//图片上传
app.post(
  "/upload",
  multer({
    //设置文件存储路径
    dest: "public/image",
  }).array("file", 1),
  
  function (req, res, next) {
    let files = req.files;
    // console.log(files);
    let file = files[0];
    // console.log(file);
    //重命名文件
    let fileInfo = {};
    // console.log(file.originalname);
    let path = "public/image/" + Date.now().toString() + "_" + file.originalname;
    let pathImg = Date.now().toString() + "_" + file.originalname
    // console.log(path);
    fs.renameSync("./public/image/" + file.filename, path);
    //获取文件基本信息
    fileInfo.type = file.mimetype;
    fileInfo.name = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = path;
    fileInfo.pathImg = pathImg;
    // console.log(fileInfo);
    res.json({
      code: 200,
      msg: "OK",
      data: fileInfo,
    });
  }
);
// 删除图片
app.post("/delete", function (req, res, next) {
  console.log(req.body[0].path.data.path);
  const filePath = req.body[0].path.data.path;
  console.log(filePath);
  
  fs.unlinkSync(filePath);
  res.send('ok')
});
app.post('/addDelect',function(req,res){
  console.log(req.body);
  const filePath = req.body.data.path;

  fs.unlinkSync(filePath);
  res.send('ok')
})

module.exports = app;

