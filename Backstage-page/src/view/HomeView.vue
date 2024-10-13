<template>
  <div class="login">
    <div class="mylogin" align="center">
      <h4>登录</h4>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
      >
        <el-form-item label="" prop="account" style="margin-top: 10px ">
          <el-row style="width: 100%;">
            <el-col :span="2">
              <span class="el-icon-s-custom">
                <svg t="1721040272744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3866" width="10" height="10"><path d="M512 625.778c-159.289 0-284.444-125.156-284.444-284.445S352.71 56.89 512 56.89s284.444 125.155 284.444 284.444S671.29 625.778 512 625.778z m0-56.89c125.156 0 227.556-102.4 227.556-227.555S637.156 113.778 512 113.778s-227.556 102.4-227.556 227.555S386.844 568.89 512 568.89z" fill="#ffffff" p-id="3867"></path><path d="M56.889 1024c0-250.311 204.8-455.111 455.111-455.111S967.111 773.689 967.111 1024h-56.889c0-221.867-176.355-398.222-398.222-398.222S113.778 802.133 113.778 1024h-56.89z" fill="#ffffff" p-id="3868"></path></svg>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input
                class="inps"
                placeholder="账号"
                v-model="loginForm.account"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="" prop="passWord">
          <el-row style="width: 100%;">
            <el-col :span="2">
              <span class="el-icon-lock">
                <svg t="1721041053016" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4999" width="10" height="10"><path d="M288 384v-74.666667c0-123.722667 100.266667-224 224-224s224 100.224 224 224v74.666667h10.677333C811.445333 384 864 436.597333 864 501.333333v320c0 64.821333-52.469333 117.333333-117.322667 117.333334H277.333333C212.554667 938.666667 160 886.069333 160 821.333333V501.333333c0-64.821333 52.469333-117.333333 117.322667-117.333333H288z m64 0h320v-74.666667c0-88.426667-71.605333-160-160-160-88.384 0-160 71.626667-160 160v74.666667zM224 501.333333v320c0 29.397333 23.914667 53.333333 53.322667 53.333334H746.666667A53.269333 53.269333 0 0 0 800 821.333333V501.333333c0-29.397333-23.914667-53.333333-53.322667-53.333333H277.333333A53.269333 53.269333 0 0 0 224 501.333333z" fill="#ffffff" p-id="5000"></path></svg>
              </span>
            </el-col>
            <el-col :span="22">
              <el-input
                class="inps"
                type="password"
                placeholder="密码"
                v-model="loginForm.passWord"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top: 55px; " >
          <el-button  type="primary" round class="submitBtn" @click="submitForm"
          style="display: flex;text-align: center;justify-content:
           center;align-items: center;width: 100%;height: 40px;font-size: 16px;"
            >登录
          </el-button>
        </el-form-item>
        <div class="unlogin">
          <router-link :to="{ path: '/forgetpwd' }"> 忘记密码? </router-link>
          |
          <router-link :to="{ path: '/registered' }">
            <a href="register.vue" target="_blank" align="right">注册新账号</a>
          </router-link>
        </div>
      </el-form>
      <helloWord class="helloWord"></helloWord>

    </div>

  </div>
</template>



<script>
import { mapMutations } from "vuex";
import helloWord from '../components/HelloWorld.vue'
import baseApi from '../api/baseApi';
import qs from 'qs'
import { ElMessage, ElMessageBox } from 'element-plus'

import { useRouter } from 'vue-router';
const router = useRouter();

export default {
  
  components:{
    helloWord
  },
  name: "Login",
  data: function () {
    return {
      loginForm: {
        account: "",
        passWord: "",
      },
      loginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" ,}],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created(){
    const localStorage = [
      {token:window.localStorage.getItem('token')}
    ]
    
    console.log(localStorage);
    if(localStorage == null){
      return
    }else{
      baseApi.post('/api/login',localStorage)
    .then(res=>{
      console.log(res.data);
      if(res.data.status === 0){
        setTimeout(() => {
            this.$router.push('/about')
        }, );
      }else{
        ElMessage({
          message: '登陆失败，请刷新页面或用户密码登陆',
          type: 'error',
          plain: true,
        })
      }
      // console.log(res);
    }).catch(err=>{
      ElMessage({
        message: '服务器连接失败',
        type: 'error',
        plain: true,
      })
    })
    }
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    submitForm() {
      const username = this.loginForm.account;
      const password = this.loginForm.passWord;
      if (!username) {
        return this.$message({
          type: "error",
          message: "账号不能为空！",
        });
      }
      if (!password) {
        return this.$message({
          type: "error",
          message: "密码不能为空！",
        });
      }
    let data = qs.stringify({
      username,
      password
    })
      baseApi.post('/api/userLogin',data)
      .then(res=>{
        if(res.data.message.status === 0){
           localStorage.setItem('token', res.data.message.token)
           localStorage.setItem('resultsAdmin', res.data.message.results)
           this.$message({
                type: "success",
                message: res.data.message.message,
                duration:'1000'
              })
            setTimeout(() => {
              this.$router.push('/about')
            }, 1000);
        }else{
          this.$message({
                type: "error",
                message: res.data.message,
                duration:'1000'
              })
        }
        console.log(res.data.message.token);
      }).catch
        (err=>{
          this.$message({
                type: "error",
                message: err,
                duration:'1000'
              })
      })
      // 打印用户输入的账号和密码
      console.log("用户输入的账号为：", username);
      console.log("用户输入的密码为：", password);
    },
  },
};

</script>

<style lang="less" scoped>
// /deep/ 深度选择器
/deep/ .el-form-item__error { 
  left: 20px;
}
  .login {
    width: 100vw;
    padding: 0;
    margin: 0;
    height: 100vh;
    font-size: 16px;
    background-position: left top;
    background-color: #242645;
    color: #fff;
    font-family: "Source Sans Pro";
    position: relative;
  }
 
  .mylogin {
    width: 240px;
    height: 280px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 50px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    opacity: 1;
    background: linear-gradient(
      230deg,
      rgba(53, 57, 74, 0) 0%,
      rgb(0, 0, 0) 100%
    );
  }
  .inps input {
    border: none;
    color: #fff;
    background-color: transparent;
    font-size: 12px;
  }
 
  .submitBtn {
    background-color: transparent;
    color: #39f;
    width: 200px;
  }
.helloWord{

  position: absolute;
  // top: 100px;
  left: 200px;
  // right: 10px;
  bottom: 100px;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>
