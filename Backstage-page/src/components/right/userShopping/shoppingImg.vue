<template>
    <div>
    <el-upload
            class="upload-demo"
            ref="upload"
            action='http://localhost:3001/api/imgload'
            :data="form"
            :on-preview="handlePreview"
            :auto-upload="false"
            :on-success="handleUploadSuccess"
           
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
    </el-upload>
    <el-button type="primary" @click="submit">确 定</el-button>
 
    </div>
</template>
<!-- export default{
methods:{
    submit(){
 this.$refs.upload.submit();
}
}
    
} -->
 
