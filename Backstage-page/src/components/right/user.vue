<template>
<NewUser></NewUser>
  <div class="userBox">
    <userTable></userTable>
  </div>
</template>

<script>
import NewUser from './userManagement/NewUser.vue'
import userTable from './userManagement/userTable.vue'
import baseApi from '../../api/baseApi'

export default {
  components: {
    userTable,
    NewUser
  },
 
}

</script>
<script >


</script>
<style>
 .userBox{
  width: 100%;
  height:calc(100vh - 50px);
  position: relative;
  overflow: auto; /* 水平和垂直滚动条 */
 }
</style>