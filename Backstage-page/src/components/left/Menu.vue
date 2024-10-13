<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
    :default-active="$route.path"

  >
    <el-menu-item index="/about/">
      <el-icon ><icon-menu /></el-icon>
      <template #title >首页</template>
    </el-menu-item>
    <el-sub-menu>
      <template #title>
        <el-icon><location /></el-icon>
        <span>管理</span>
      </template>
      <el-menu-item-group>
        <template #title><span>用户管理</span></template>
        <el-menu-item index='/about/user'>
          用户
        </el-menu-item>
        <!-- <el-menu-item index='/about/user'>
          <router-link :to="{path:'/about/user'}">item two</router-link>
        </el-menu-item> -->
      </el-menu-item-group>
      <el-menu-item-group title="商品管理">
        <el-menu-item index='/about/shopping'>
         商品介绍
        </el-menu-item>
        <el-menu-item index='/about/shopping/edit'>
          添加商品
        </el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="订单管理">
        <el-menu-item index='/about/shoppingOrder'>
          商品详情
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index='/about/404' >
      <el-icon><document /></el-icon>
      <template #title>404</template>
    </el-menu-item>
    <!-- <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item> -->
    <el-radio-group class="el-radio-group-button" v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button class="button" :value="!isCollapse">展开</el-radio-button>
      <!-- <el-radio-button class="button" :value="true">收回</el-radio-button> -->
    </el-radio-group>
  </el-menu>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
// .el-menu{
//   display: grid;

// }
.el-menu-vertical-demo{
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
  
}
.el-radio-group{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

.el-radio-group-button{
  .button{
    width: 100%;
  }
}
/deep/.el-radio-button__inner{
  width: 100%;
}
.router-link-active {
  text-decoration: none;
  color: #409eff;
}
a{
  text-decoration: none;
  color: black ;
}
</style>