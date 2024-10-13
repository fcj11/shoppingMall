<template>
  <div class="right">
    <headBox></headBox>
        <router-view></router-view>
    </div>
</template>

<script>
import headBox from './userComponents/head.vue'

export default {
    components: {
        headBox
  },
}
</script>
<style lang="less" scoped>
    .right{
        position: relative; 
        bottom: 0;
        width: 100%;
        height: 100vh;
        overflow: auto;
        display: grid;
        grid-template-rows: 50px 1fr;
    }
</style>