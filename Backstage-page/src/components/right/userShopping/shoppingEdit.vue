<template>
    <el-main>
        <div class="title">
            <h1>添加商品信息</h1>
        </div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="商品名称">
            <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编号">
            <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
            <el-input v-model="formLabelAlign.category" placeholder="请按照 A,B,C方法输入"></el-input>
        </el-form-item>
        <el-form-item label="商品种类">
            <el-input v-model="formLabelAlign.type" ></el-input>
        </el-form-item>
        <el-form-item label="商品照片">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="http://127.0.0.1:5173/imgTable/upload"
                :on-preview="handlePreview"
                list-type="picture-card"
                :file-list="fileList"
                accept="image/*"
                :on-success="uploadSuccess"
                :on-change="handleChange"
                :before-remove="handleRemove"
                :on-exceed="handleExceed"
                :limit = 7
            >
            
            </el-upload>
        </el-form-item>
        <el-form-item label="商品价格">
            <el-input v-model="formLabelAlign.price" ></el-input>
        </el-form-item>
        <el-form-item label="商品介绍">
            <el-input v-model="formLabelAlign.detailed" ></el-input>
        </el-form-item>
        <el-form-item label="商品状态">
            <el-radio v-model="formLabelAlign.radio" label="1">上架</el-radio>
            <el-radio v-model="formLabelAlign.radio" label="2">下架</el-radio>
        </el-form-item>
        <el-form-item label="商品数量">
            <el-input v-model="formLabelAlign.number"></el-input>
        </el-form-item>
        <el-button type="primary" round @click="upFormLabelAlign">保存</el-button>
        <el-button type="warning" round @click="deleteFormLabelAlign">关闭</el-button>

</el-form>
        
    </el-main>
</template>
<script lang="ts" setup>
import baseApi from '../../../api/baseApi'
import { ElMessage, ElMessageBox } from 'element-plus'
import {defineComponent, ref , reactive ,watch ,toRaw} from 'vue'
import axios from 'axios';
import qs from 'qs'
// import { useRoute } from 'vue-router';
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

const labelPosition = 'left'
const dialogImageUrl = ''
const dialogVisible = false
const formLabelAlign = ref({
    id:'',
    name: '',
    region: '',
    type: '',
    price:'',
    number:'',
    radio: '1',
    img:[],
    category:[],
    detailed:''
})
const url = ref([])
const imgEl = ref('')
const fileList = ref([])
const options = [{
    type: '选项1',
    label: '黄金糕'
},{
    type: '选项2',
    label: '双皮奶'
}]
// const route = useRoute();
// const queryParams = route.query;
// console.log(Object.keys(queryParams).length);
// if(Object.keys(queryParams).length == 0){
//     console.log('没有参数');
// }else{
//     baseApi.post('/shopping/queryShopping',route.query)
//     .then(res=>{
//         let box = []
//         res.data.message[0].img.forEach(item=>{
//             item = 'http://localhost:5173'+item
//             box.push(item)
//         })
//         // console.log(res);
//         res.data.message[0].img = box
        
//         // console.log(box);
//         // console.log(formLabelAlign.value,'formLabelAlign');
//         formLabelAlign.value = res.data.message[0]
//         console.log(formLabelAlign.value,'formLabelAlign');
//         setTimeout(() => {
//         });
//     }).catch(err=>{
//         console.log(err);
//     })
// }
function delectImg(item){
    console.log(item);
    
}
function handleChange(file) {
    this.fileList.push(file) 
    console.log( this.fileList);
}   
// 将后端发来的照片地址以url的形式保存
let imgUrl = ref([])
function uploadSuccess(res, file, fileList) {
    imgUrl = URL.createObjectURL(file.raw);
    // 将地址保存到formLabelAlign表单处
    console.log(file.response);
    formLabelAlign.value.img.push(file.response.data.pathImg)
}
// 定义一个ref绑定el-upload
const upload = ref(null);
//  删除上传的照片
async function handleRemove(file, fileList) {
        // 获取照片地址
    const fileID = [{path:file.response}]
    console.log(file.response);
        // console.log(fileID);
    try {const response = 
        await axios.post('http://127.0.0.1:5173/imgTable/delete',fileID);
    // console.log(response.data);
    } catch (error) {
    // console.error('Error fetching data:', error);
    }
}
function handlePreview(file) {
    // console.log(file);
}
// 表单上传
function upFormLabelAlign(){
        // console.log(fileList.value.length);
        const name =/^[a-zA-Z0-9_\u4e00-\u9fa5]*$/
        const number = /^[0-9]+\.{0,1}[0-9]{0,2}$/
        // 表单的非空判断
        if( formLabelAlign.value.name == '' ||
            formLabelAlign.value.region == '' ||
            formLabelAlign.value.type == '' || 
            formLabelAlign.value.price == '' || 
            formLabelAlign.value.number == '' || 
            formLabelAlign.value.radio == '' ||
            formLabelAlign.value.category == []||
            formLabelAlign.value.detailed == ''

        ){
            return ElMessage({
                type: 'error',
                message: '请填写完整信息',
            })
        }
        // // 合法字符判断
        if(!name.test(formLabelAlign.value.name)){
            return ElMessage({
                type: 'error',
                message: '商品名称只能输入中文、英文、数字、下划线',
            })
        }
        if(!name.test(formLabelAlign.value.type)){
            return ElMessage({
                type: 'error',
                message: '商品名称只能输入中文、英文、数字、下划线',
            })
        }
        if(!number.test(formLabelAlign.value.price)){
            return ElMessage({
                type: 'error',
                message: '商品价格只能输入数字和小数点后两位',
            })
        }
        if(!number.test(formLabelAlign.value.number)){
            return ElMessage({
                type: 'error',
                message: '商品数量只能输入数字和小数点后两位',
            })
        }
        if(!number.test(formLabelAlign.value.region)){
            return ElMessage({
                type: 'error',
                message: '商品编号错误',
            })
        }
        // 判断通过后调用upload的submit方法
        // upload.value.submit();
        setTimeout(() => {
            // console.log(formLabelAlign.value);
            // if(fileList.value.length == 0){
            //     formLabelAlign.value.img = ''
            // }
            console.log(formLabelAlign.value);
            
            let formValue = qs.stringify(formLabelAlign.value)
            
            baseApi.post('/shopping/add',formValue)
                .then(res=>{
                    console.log(formValue);
                    if(res.data.status == 0){
                        ElMessage({
                            message: '新增成功',
                            type: 'success',
                        })
                    }else{
                        ElMessage({
                            message: '添加失败',
                            type: 'error',
                        })
                    }
                    console.log(res);
                }).catch(err=>{

                    if(formLabelAlign.value.img.length != 0){
                        const fileID = [{path:formLabelAlign.value.img}]
                        console.log(fileID);
                        try {const response = 
                             axios.post('http://127.0.0.1:5173/imgTable/delete',fileID);
                        console.log(response);
                        } catch (error) {
                        console.error('Error fetching data:', error);
                        }
                    }
                    console.log(err);
                    // upload.clearFiles()
                })
                setTimeout(() => {
                    
                
                upload.value.clearFiles()
                formLabelAlign.value.img=[]
                formLabelAlign.value.id = '' 
                formLabelAlign.value.name = '' 
                formLabelAlign.value.region = ''
                formLabelAlign.value.type = '' 
                formLabelAlign.value.price = '' 
                formLabelAlign.value.number = ''
                formLabelAlign.value.radio = '1'
                formLabelAlign.value.detailed = ''
                formLabelAlign.value.category = []
                upload.value.clearFiles()
            });
                console.log( formLabelAlign.value);

            }, 
            
        );
}

    //该方法就是清理上传列表
    const uploadRef = ref<UploadInstance>()
    function deleteFormLabelAlign(){
                formLabelAlign.value.img=[]
                formLabelAlign.value.name = '' 
                formLabelAlign.value.region = ''
                formLabelAlign.value.type = '' 
                formLabelAlign.value.price = '' 
                formLabelAlign.value.number = ''
                formLabelAlign.value.radio = '1'
                formLabelAlign.value.category = []
                formLabelAlign.value.detailed = ''

                upload.value.clearFiles()	//该方法就是清理上传列表
            return ElMessage({
                type: 'success',
                message: '删除成功',
            })
    }
    //图片上传之前
    function uploadBefore(file) {
      let limitMax = 5000 * 1024;
      if (file.size > limitMax) {
        this.$messageTips("大小超出限制");
        return false;
      }
    }
    function handleUploadRemove(index, fileList) {
        formLabelAlign.value.img.splice(index,1)
        // console.log(formLabelAlign.value.img)
    }
    function handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    }
    function handleExceed(files, fileList) {
        ElMessage({
        type: 'error',
        message: '只能上传7张照片',
      })
    }
</script>

<style lang="less" scoped>
    .title{
        display: flex;
        width: 100%;
        height: 40px;
        line-height:40px;
        position: relative;
        top: 0;
        left: 10px;
        h1{ 
            line-height:40px;
            font-size: 20px;
            position: absolute;
            left: 0;
        }
    }  
    .upload-demo{
        display: grid;
    }


.avatar-uploader {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
// /deep/ .el-upload .el-upload-dragger {
//     width: 148px;
//     height: 148px;
// }
/deep/.el-upload-list__item-actions{
    // width: 148px;
    height: 148px;
    display: flex;
}

/deep/.el-upload-list--picture-card{
    width: 100%;
    height: 148px;
    display: flex;
}
/deep/.el-upload--picture-card {
    width: 148px;
    height: 148px;
    display: flex;
}
</style>
