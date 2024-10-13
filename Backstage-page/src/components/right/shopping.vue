<template>

        <div class="userShopping">
            <shoppingTable></shoppingTable>
        </div>
</template>
    
<script>
import shoppingTable from './userShopping/shoppingTable.vue'
import baseApi from '../../api/baseApi'
    
export default {
      components: {
        shoppingTable
      },
    }
</script>

<style>
     .userShopping{
      width: 100%;
      height:calc(100vh - 50px);
      position: relative;
      overflow: auto; /* 水平和垂直滚动条 */
     }
</style>