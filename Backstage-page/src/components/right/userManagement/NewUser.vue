<template>
    <el-button plain :key="count.componentKey" @click="dialogFormVisible = true">
        新增用户
    </el-button>
    <el-dialog v-model="dialogFormVisible" title="新增用户" width="500">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off" />
        </el-form-item>
        <el-form-item  label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.pas" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item  label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.pasTwo" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="Please select a zone">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close()">关闭</el-button>
          <el-button :plain="true" type="primary" @click="printValue()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import LogScale from 'echarts/types/src/scale/Log.js';
import { reactive, ref ,onUpdated} from 'vue'
import { ElMessage,dayjs } from 'element-plus'
import baseApi from '../../../api/baseApi'
import qs from 'qs'
  const dialogTableVisible = ref(false)
  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  const count = reactive({
    componentKey:0,
    isShow:false
  })
  const form = reactive({
    name: '',
    age: '',
    pas:'',
    pasTwo:'',
    gender: '',
    newTime:'',
   
  })


          
  function printValue(){
    const username = form.name
    const age = form.age
    const gender = form.gender
    const pas = form.pas
    const pasTwo = form.pasTwo
    const nameRule  = /^[A-Za-z0-9-_\u4e00-\u9fa5]{4,30}$/
    const ageRule = /^\d{2}$/
    const pasRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&])[A-Za-z\d@!%*?&]{8,}$/
    // const pasRule = /^\d+$/

    if(username === '' || age === '' || gender === '' || pas === ''|| pasTwo === ''){
        form.name = ''
        form.age = ''
        form.gender = ''
        form.pas = ''
        form.pasTwo = ''
        ElMessage.error('请输入完整的信息')
        return console.log('请输入完整信息');
    }
    if(nameRule.test(username) && ageRule.test(age) && pasRule.test(pas) && pasRule.test(pasTwo)){
      form.name = ''
      form.age = ''
      form.gender = ''
      form.pas = ''
      form.pasTwo = ''
      this.newTime = dayjs(new Date()).format("YYYY-MM-DD")
      const userInformation =qs.stringify({
        username: username,
          age: age,
          gender: gender,
          date: this.newTime,
          password:pas
      }) 
      console.log('userInformation');
      console.log(userInformation);
      baseApi.post('/about/user/newlyAdded',userInformation)
      .then(res=>{
        history.go(0)
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
      this.dialogFormVisible = false
      ElMessage({
        message: '新增成功',
        type: 'success',
    })
    


    ;return
    }else if(pas != pasTwo){
     return ElMessage.error('两次密码不同')
    }else if(!ageRule.test(age) == true){
        return ElMessage.error('年龄错误')
    }else if(!pasRule.test(pas) == true || !pasRule.test(pasTwo) == true){
        return ElMessage.error('至少一个小写字母、至少一个大写字母、至少一个数字和至少一个特殊字符最少不能少于八位')
    }else{
      return ElMessage.error('请输入正确的信息')
    }
    
    
  }
  function close(){
    form.name = ''
    form.age = ''
    form.gender = ''
    this.dialogFormVisible = false;  
    form.pasTwo = ''
    form.pas = ''
    }
</script>
