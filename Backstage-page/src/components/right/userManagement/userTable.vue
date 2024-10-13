<template>
    <el-table stripe :data="tableData" style="width: 100%;" :key="form.componentKey" v-if="form.isShow">
      <el-table-column label="创建时间" width="180" >
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon size="20px"><User /></el-icon>
            <span class="span-box" style="
             ">{{ scope.row.date}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名字" width="180">
        <template #default="scope">
              <el-tag>{{ scope.row.username }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.age }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.gender }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right" class="setting" label="设置">
        <template #default="scope" class="setting-button">
          <el-button plain size="small" @click="editUser(scope.$index, scope.row)">
            编辑
          </el-button>
          
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="编辑信息" width="500">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="count.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="count.age" autocomplete="off" />
        </el-form-item>
        <el-form-item  label="密码" :label-width="formLabelWidth">
          <el-input v-model="count.password" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="count.gender" placeholder="Please select a zone">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button  #default="scope" type="primary" @click="edit()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { User } from '@element-plus/icons-vue'
import { defineComponent, onMounted, reactive, ref ,defineProps, inject} from 'vue'
import {dayjs} from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action, useTransitionFallthroughEmits } from 'element-plus'
import baseApi from '../../../api/baseApi'
import qs from 'qs'
  const dialogFormVisible = ref(false)
  const outerVisible = ref(false)
  const innerVisible = ref(false)
  
  interface User {
    date: string
    username: string
    age:string
    gender:string
    password:string 
    id:string
  } 
  const form = reactive({
    componentKey:0,
    isShow:false
  })
  let count = reactive({})

let tableData: User[] = []

let countTable = reactive({})


  baseApi.get('/about/user') 
    .then(res =>{
      tableData = res.data.message
      console.log(tableData);
      form.isShow = true
      console.log(res.data);
      countTable=tableData
      console.log(countTable);
      
    }).catch(err =>{
      console.log(err)
})
  function editUser(index: number, row: User){    
    this.dialogFormVisible = true  
    this.count = row
  }
  // 编辑确认
  function edit(){
    console.log(this.count);
    let data = qs.stringify(this.count)
    baseApi.post('/about/user/editUser',data)
    .then(res =>{
     console.log(res);     
     this.dialogFormVisible = false
    }).catch(err =>{
      console.log(err);
    })
  }
  // 删除信息
  const handleDelete = (index: number, row: User) => {
    ElMessageBox.confirm(
    `确定要删除${row.username}吗？`,
    '删除用户',
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

      baseApi.post('/about/user/deleteUser',qs.stringify({id : row.id}))
      .then(res =>{
        countTable.splice(index,1)
        console.log(res);
        // itemKey = Math.random()
        // this.$set(this.tableData,index,row);
        // this.$forceUpdate();
        form.componentKey = form.componentKey +1;        

      }).catch(err =>{
        console.log(err);
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
  }

</script>

<style scoped>

.table-el {
  height: 100%;
  background-color: aqua;
  display: grid;
  overflow: auto; /* 水平和垂直滚动条 */
}

.span-box{
  margin-left: 10px ;
  height:70px ; 
  line-height:70px;
  font-size: 17px;
  font-weight: bold;
}
</style>
  