<template>
    <el-container class="box">
      <el-container class="boxMin">
        <el-aside class="leftBix">
          <div class="imgBox" >
            <div v-for="(item,index) in form.img" @click="changeImg(item,index)"  @mouseenter="down(item,index)"
             :key="item" class="photo-container">
              <el-image class="photo"  style="width: 100%; position: relative; "
               :src="item" fit="cover" />
              <el-icon  style="position: absolute; z-index:
               10; top:2px; right: 2px; color: aliceblue;  
                cursor: pointer;" @click="delectImg(index,item)"><Close /></el-icon>
              <div class="mask" v-if="index"></div>
            </div>
          </div>
          <div class="block text-center">
           <!-- <el-image style="width: 100px; height: 100px" :src="a" fit="contain"/> -->
            <el-carousel height="500px" ref="carousel">
              <el-carousel-item v-for="item in form.img" :key="item">
                <el-image style="width: 100%; height: 100%" :src="item" fit="contain"/>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-aside>
        <el-main class="main">
          <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="商品名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="商品编号">
              <el-input v-model="form.region" />
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="form.number" />
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
                :before-upload="beforeUpload"
                :limit = 7
            >
            
            </el-upload>
        </el-form-item>
            <el-form-item label="商品类别">
              <div v-for="(item,index) in form.category" :key="index" >
                <el-input v-model="form.category[index]" type="text" style="width: 240px" 
                :placeholder="item" @focus="handleFocus"/>
              </div>
                <el-input v-model="categoryAdd"  placeholder="请按照 A,B,C方法输入"></el-input>
            </el-form-item>
            <el-form-item label="商品状态">
              <el-radio v-model="form.radio" label="1">上架</el-radio>
              <el-radio v-model="form.radio" label="2">下架</el-radio>
            </el-form-item>
            <el-form-item label="商品详细">
              <el-input v-model="form.detailed" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>

    </el-container>
</template>
<script lang="ts" setup>
import baseApi from '../../../api/baseApi'
import { ElMessage, ElMessageBox } from 'element-plus'
import {defineComponent, ref , reactive ,watch ,toRaw} from 'vue'
import axios from 'axios';
import qs from 'qs'
import { useRoute } from 'vue-router';
import { Close } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { useRouter } from 'vue-router';
import { onBeforeRouteLeave } from 'vue-router'
const router = useRouter();
const form = ref({
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
const formLabelAlign = ref([])
const categoryAdd = ref([])
const fileList =  ref([])
const a = ref([])
const carousel= ref([])
function handleFocus(event: Event) {

  // const inputElement = event.target as HTMLInputElement;
  // inputElement.value = '';

}
function changeImg(item,index){
  console.log(item,index);
  console.log(index);
  this.carousel.next(index)
  const a = document.querySelector('.mask')
  a.addEventListener('click', function() {
    // 将display改为none
    a.style.display = 'none';
  })
}

function down(item,index){
  // console.log('12121212');
  // index是小图获取的下标
  // this.carousel.setActiveItem是大图的下标
  // 这里将小图的下标赋值给大图
 this.carousel.setActiveItem(index)
//  获取小图的
}
// 获取路由传参id值
const route = useRoute();
const queryParams = route.query;
console.log(Object.keys(queryParams).length);
if(Object.keys(queryParams).length == 0){
    console.log('没有参数');
}else{
    baseApi.post('/shopping/queryShopping',route.query)
    .then(res=>{
      console.log(res.data.message[0].category);
        console.log(form.value);
        let box = []
        console.log(res.data.message[0].img);
        if(res.data.message[0].img != null){
          res.data.message[0].img.forEach(item=>{
            item = 'http://localhost:5173'+item
            box.push(item)
          })
        }
       
        res.data.message[0].category.forEach(item=>{
          item = item.replace(/["]+/g, '');
        })
        console.log(res.data.message[0].category);

        // console.log(res);
        res.data.message[0].img = box
        form.value = res.data.message[0]
        fileList.value.img = res.data.message[0].img
        console.log(fileList.value.img);
        // console.log(box);
        // console.log(formLabelAlign.value,'formLabelAlign');
        // formLabelAlign.value = res.data.message[0]
        // console.log(formLabelAlign.value,'formLabelAlign');
        // setTimeout(() => {
        // });
    }).catch(err=>{
        console.log(err);
    })
}
// 删除本地照片 不保存
const delectImg = (index,item) =>{
  console.log(index,item);
  ElMessageBox.confirm(
    '确定要删除照片吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '关闭',
      type: 'warning',
    }
  )
    .then(() => {
      form.value.img.splice(index,1)
      fileList.value.img.splice(index,1)
      return ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      return ElMessage({
        type: 'error',
        message: '删除失败',
      })
    }) 
}
// 提交
// 是否提交了 默认否
const save = ref(false)
// 判断离开当前路由
onBeforeRouteLeave((to, from, next)=>{
  if(save.value == false){
    ElMessageBox.confirm(
      '确定要离开吗？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        type: 'warning',
      }
    )
      .then(() => {
        console.log(addImg.value);
        if(addImg.value.length != 0 ){
          addImg.value.forEach(item=>{
            baseApi.post('/imgTable/addDelect',item)
            .then(res=>{
              console.log(res);
            })
            .catch(err=>{
              console.log(err);
            })
          })
        }
       
        next()
      })
      .catch(() => {
        next(false)
      })
  }else{
    next()
  }
  
})
const onSubmit = () => {
  console.log(form.value);
  console.log(categoryAdd.value.length);
  // 处理类别进行分割
  if(categoryAdd.value.length != 0){
    let values = categoryAdd.value.split(',');
    let box = []
    let array = values.map(function(item) {
      // item = JSON.stringify(item)
      console.log(item);
      form.value.category.push(item)
      categoryAdd.value=''
    });
  }
    // 处理图片
    // console.log(form.value.img.length);
    // console.log(form.value.img);
    // const newImg = []
    // oldImg.push(form.value.img)
    // if(form.value.img.length != 0){
    //   form.value.img.forEach(item =>{
    //     newImg.push(item.replace(/^http(s)?:\/\/localhost:5173\/image\//, ''))
    //   })
    // // newImg是切割过的照片链接
    // // form.value.img = newImg
    // }
    // const newForm = form.value

    // newForm.img = newImg
    // console.log(newForm);
    baseApi.post('/shopping/add',form.value)
    .then(res=>{
      if(res.data.status == 0){
          ElMessage({
            message: '新增成功',
            type: 'success',
          })
          save.value = true
          form.value.img = oldImg
          }else{
          ElMessage({
            message: '添加失败',
            type: 'error',
          })
        }
        console.log(res);
    }).catch(err=>{
    })
  
  console.log('submit!')
}
// 取消编辑
const cancel = () =>{
  // 回到上一级目录
  router.back()
}
const up = ref(true)
const upload = ref(null);
const beforeUpload = (file) => {
  if(fileList.value.img.length >= 7){
    console.log(form.value.img);
    console.log(form.value.img.length);
    ElMessage({
      message: '超过最大上传数量.',
      type: 'error',
    })
    upload.abort()
    up.value = false
  }
}
const addImg = ref([])
const uploadSuccess = (file) =>{
  console.log(file);
  console.log(addImg);
  // console.log(this.addImg);
  console.log(file);
  
  
  addImg.value.push(file) 
  console.log(addImg.value);
  
  file.data.pathImg = 'http://localhost:5173/image/' + file.data.pathImg
  form.value.img.push(file.data.pathImg)
  console.log(file.data.pathImg);
}
const uploadRemove = (file,fileList) =>{

}
const uploadChange = (file,fileList) =>{
  
}
async function handleRemove (file)  {
  // console.log(file,'file');
  // console.log(fileList.value.img[0],'fileList');
  if(up.value === true){
    let index = form.value.img.indexOf(file.response.data.pathImg)
    console.log(index);
  if(index != -1){
    console.log(form.value.img);
    form.value.img.splice(index,1)
    // 因为form.value.img是双向绑定的，所以fileList.value.img也会改变
    // fileList.value.img.splice(index,1)
  }
  console.log(form.value.img);
  const fileID =[{path:file.response}]
  console.log(addImg.value[0]);
  // fileID = fileID[0].path
  console.log(fileID[0].path);
  const delect = fileID[0].path
//   console.log(addImg);
  
  console.log(delect.data.name);
  console.log(addImg.value);
  addImg.value.forEach(item=>{
    if(item.data.name === delect.data.name)
      addImg.value.splice(item,1)
  })
  console.log(addImg.value);

//   let i = addImg.value.indexOf(delect.data.name)
//   if (i !== -1) {
//     addImg.splice(i, 1); // 从索引位置删除一个元素
// }
  console.log(addImg);
  
  try {const response = 
         await axios.post('http://127.0.0.1:5173/imgTable/addDelect',delect)
         .then(response =>{
          ElMessage({
            message: '删除成功.',
            type: 'success',
            plain: true,
          })
          console.log(response.data);
          
         }).catch(err =>{
          ElMessage({
            message: '删除失败.',
            type: 'error',
            plain: true,
          })
         })
    // console.log(response.data);
    } 
    catch (error) {
    // console.error('Error fetching data:', error);
    }
  }
  
}
</script>

<style lang="less" scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.leftBix{
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* height: 100%; 或者设置具体的高度 */
  width: 44%;
  height: 100%;
}
.block{
  width: 100%;
  height: 100%
}
.imgBox{
  width: 20%;
  height: 100%;
  /* background-color: #99a9bf; */
  margin-right: 20px;
  overflow: auto;

  
}
.box{
  padding: 40px;
  background-color: #F4F6F8;
  height: 90vh;
  overflow: auto;


}
.boxMin{
  padding: 20px;
  background-color:white;
  border-radius: 10px;
}
.shoppingName{
  width: 100%;
}
//照片父元素
.photo-container {
  width: 100%;
  position: relative;
  display: inline-block;
}
// 子元素
.photo {
  width: 100%;
  display: block;
  position: relative;
}
// 遮罩层
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
  cursor: pointer;
  z-index: 1;
}
// 添加遮罩
// .photo-container:hover .mask {
//  display: none;
// }
:deep(.el-carousel__indicators--horizontal)  {
        position: absolute;
        left: auto;
        right: 100px;
        bottom: 10px;
        text-align: right;
 
        .el-carousel__indicator--horizontal button {
            width: 8px;
            height: 8px;
            background: #ffffff;
            border-radius: 50%;
            opacity: 0.5;
        }
 
        .el-carousel__indicator--horizontal.is-active button {
            width: 24px;
            height: 8px;
            background: #ffffff;
            opacity: 0.5;
            border-radius: 10px;
        }
    }
    .main{
      height: 100%

    }
    .el-form-item__content{
      height: 100px; /* 设置固定高度 */
      overflow: auto; /* 超出高度显示滚动条 */
    }
    :deep(.el-upload-list__item-actions){
    // width: 148px;
    height: 100px;
    display: flex;
}

:deep(.el-upload-list--picture-card){
    width: 100%;
    height: 100px;
    display: flex;
}
:deep(.el-upload--picture-card ){
    width: 100px;
    height: 100px;
    display: flex;
}
:deep(.el-upload-list__item-thumbnail){
  width: 100px;
  height: 100px;
}
:deep(.el-upload-list__item.is-success){
  width: 100px;
  height: 100px;
}
:deep(.el-upload-list__item-actions){
  width: 100px;
  height: 100px;
}
:deep(.el-upload-list__item .is-ready){
  width: 100px;
  height: 100px;
}
</style>