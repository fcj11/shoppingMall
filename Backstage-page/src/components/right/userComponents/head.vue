<template>
    <div class="head">
        <div class="userBox">
            <headUserImg></headUserImg>
            <div class="user-name">{{ this.name }}</div>
        </div>
        <button class="Btn" @click="down()">
            <div  class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <!-- <div class="text">Logout</div> -->
        </button>
    </div>
</template>

<script >
import headUserImg from './headUserImg.vue';
import baseApi from '../../../api/baseApi.js';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router';
import {defineComponent, ref , reactive ,watch ,toRaw} from 'vue'

// const route = useRoute();
export default {
    name:'head',
    components:{
        headUserImg
    },
    
    created(){
        const name = ''
        const resultsAdmin = [
            {resultsAdmin:window.localStorage.getItem('resultsAdmin')}
        ]
        console.log(resultsAdmin[0].resultsAdmin);
        if(resultsAdmin[0].resultsAdmin != null){
              this.name = resultsAdmin[0].resultsAdmin
        }else{
             this.name = '用户名'
        }
        
    },
    methods:{
        down(){
            const localStorage = [
                {token:window.localStorage.getItem('token')}
            ]
            baseApi.post('/api/down',localStorage)
            .then(res=>{
                if(res.data.status == 0){
                    ElMessage({
                        type: 'success',
                        message: '退出成功',
                    })
                    setTimeout(() => {
                        window.localStorage.removeItem('token')
                        this.$router.push('/login')
                    }, 1000);
                }
            }).catch(err=>{
                
                console.log(err);
            })
        }
    }
}

</script>

<style lang="less" scoped>
    .head{
        display: flex;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #dcdfe6;
        position: relative;
        .userBox{
            position: absolute;
            right: 100px;
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            .user-img{
                width: 40px;
                height: 40px;
                border-radius: 50px;

                border: 1px solid #dcdfe6;
                margin-right: 10px;
                background-color: aqua;
            }
            .user-name{
                font-size: 20px;
                line-height: 50px;
            }
            
        }
        .Btn {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: 45px;
                height: 45px;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                position: absolute;
                right:20px;
                overflow: hidden;
                transition-duration: .3s;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
                background-color: rgb(255, 255, 255);
            }

            /* plus sign */
            .sign {
            width: 100%;
            transition-duration: .3s;
            display: flex;
            align-items: center;
            justify-content: center;
            }

            .sign svg {
            width: 17px;
            }

            .sign svg path {
            fill: black;
            }
            /* text */
            .text {
            position: absolute;
            right: 0%;
            width: 0%;
            opacity: 0;
            color: black;
            font-size: 1.2em;
            font-weight: 600;
            transition-duration: .3s;
            }
            /* hover effect on button width */
            // .Btn:hover {
            // width: 125px;
            // border-radius: 40px;
            // transition-duration: .3s;
            // }

            // .Btn:hover .sign {
            // width: 30%;
            // transition-duration: .3s;
            // padding-left: 20px;
            // }
            /* hover effect button's text */
            // .Btn:hover .text {
            // opacity: 1;
            // width: 70%;
            // transition-duration: .3s;
            // padding-right: 10px;
            // }
            /* button click effect*/
            .Btn:active {
            transform: translate(2px ,2px);
            }
    }
</style>