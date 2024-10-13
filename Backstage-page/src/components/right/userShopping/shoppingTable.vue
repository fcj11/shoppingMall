<template>
    <el-table stripe :data="tableData" style="width: 100%" :key="form.componentKey" v-if="form.isShow">
        
      <el-table-column label="商品" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.img"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                fit="contain"
                />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="120">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>name: {{ scope.row.name }}</div>
              <div>address: {{ scope.row.address }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.name }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.region }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品种类" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.type }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="120">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.price }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.number }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.category }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" >
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.radio }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="介绍" width="160" >
        <template #default="scope">
          <div style="display: flex; 
          align-items: center; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;">
            <span>{{ scope.row.detailed }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Operations" align="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, onMounted, reactive, ref ,defineProps, inject} from 'vue'
import { Timer } from '@element-plus/icons-vue'
import baseApi from '../../../api/baseApi'
import qs from 'qs'
import { useRouter } from 'vue-router';

const router = useRouter();
  // const url =
  // 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
// const srcList = [
//   'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
//   'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
//   'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
//   'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
//   'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
//   'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
//   'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
// ]
const dialogFormVisible = ref(false)


const form = reactive({
    componentKey:0,
    isShow:false
  })
  let count = reactive({})

  interface User {
    id:string
    img:string
    name: string
    price:string
    type:string
    number:string
    radio:string
    region:string
    category:string
    detailed:string
  }let countTable = reactive({})

  let tableData: User[] = []
  baseApi.get('/shopping/getShopping')
  .then(res=>{
    const table = res.data.message
    table.forEach(item=>{
     console.log(table);
     item.img = 'http://localhost:5173' + item.img
     if(item.radio ==='1'){
      item.radio = '上架中'
     }else if(item.radio=='2'){
      item.radio = '已下架'

     }
  })
    tableData = table
    form.isShow = true
    countTable=tableData
  }).catch((err)=>{
    console.log(err.message);
  })

  // baseApi.get('/shopping/getShopping')
  // .then((res)=>{
  // tableData = res.data.message
  //   console.log(tableData);
  //   form.isShow = true
  //   countTable=tableData
  // }).catch((err)=>{
  //   console.log(err);
  // })
  function handleEdit (index: number, row: User) {
    console.log(index, row)
    // this.dialogFormVisible = true  
    // this.count = row
    // 跳转页面
    console.log(row.id);
    this.router.push({
      name:'upDown',
      query:{
        id:row.id
      }
    })
  }
  function handleDelete (index: number, row: User) {
    ElMessageBox.confirm(
    `确定要删除${row.name}吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      let id = {id:row.id}    
        baseApi.post('/shopping/delete',id)
        .then(res=>{
          form.componentKey = form.componentKey +1;  
          console.log(res);
          console.log(tableData);
          console.log(this.tableData);
          
          
        }).catch((err)=>{
          console.log(err);
        })
        this.tableData.splice(index, 1)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
    // console.log(index, row)
   
  }
  function edit(){

    this.dialogFormVisible = false;
    
  }

  // const tableData: User[] = [
  //   {
  //     img:  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  //     name: 'Tom',
  //     price:'201',
  //     type:'电器',
  //     number:'1',
  //     radio:'上架',
  //     region:'1212121'
  //   },
  //   {
  //     img:  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  //     name: 'Tom',
  //     price:'201',
  //     type:'电器',
  //     number:'1',
  //     radio:'上架',
  //     region:'12314'
  //   },
  //   {
  //     img:  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  //     name: 'Tom',
  //     price:'201',
  //     type:'电器',
  //     number:'1',
  //     radio:'上架',
  //     region:'12122323'
  //   },
  //   {
  //     img:  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  //     name: 'Tom',
  //     price:'201',
  //     type:'电器',
  //     number:'1',
  //     radio:'上架',
  //     region:'34241'
  //   },
  // ]
  </script>
  <style>
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
  
}
.el-upload-list--picture-card {
    width: 100px;
    height: 100px
}
.el-upload--picture-card{
    width: 100px;
    height: 100px
}

.el-upload-list__item-actions{
    width: 100px;
    height: 100px
}
.el-message-box__title{
  color: brown;
  font-weight: bolder;
}
</style>
  