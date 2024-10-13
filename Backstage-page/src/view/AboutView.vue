<template>
  <div class="box">
    <Menu/>
    <right/>

  </div>

</template>
<script>
import Menu from '../components/left/Menu.vue'
import right from '../components/right/right.vue'

export default {
  name: "AboutView",
  
  components: {
     Menu ,
     right,

  },
 
};
</script>
<style lang="less" scoped>
  .box{
    display: flex;
  }
</style>