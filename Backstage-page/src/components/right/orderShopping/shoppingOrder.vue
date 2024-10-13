<template>
    <el-container class="orderContainer">
        <el-header class="header">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" >
                <el-form-item label="订单编号">
                    <el-input v-model="formInline.orderNumber" placeholder="Approved by" clearable style="width: 150px;"/>
                </el-form-item>
                <el-form-item label="订单状态" >
                    <el-select
                        v-model="formInline.state"
                        placeholder="订单状态"
                        clearable
                    >
                        <el-option label="未完成" value="未完成" />
                        <el-option label="未支付" value="未支付" />
                        <el-option label="运输中" value="运输中" />
                        <el-option label="未评价" value="未评价" />
                        <el-option label="已完成" value="已完成" />
                    </el-select>
                </el-form-item>
                <el-form-item label="完成时间">
                    <el-date-picker
                        v-model="formInline.completionTime"
                        type="date"
                        placeholder="Pick a date"
                        clearable
                        @change="pickerChangeFn"
                    />
                </el-form-item>
                <el-form-item label="商品类别">
                <el-input v-model="formInline.category" placeholder="Approved by" clearable style="width: 150px;"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button  @click="onSubmitDelete">清空</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main class="el-main">
            <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
            style="width: 100%; height: 92%; overflow: hidden " stripe border 
            :row-style="{ height: '54px' }"
            :key="componentKey" >
                <el-table-column prop="data" label="订单时间" show-overflow-tooltip/>
                <el-table-column prop="iphone" label="联系人手机号" show-overflow-tooltip/>
                <el-table-column prop="orderNumber" label="订单编号" show-overflow-tooltip/>
                <el-table-column prop="completionTime" label="完成时间" show-overflow-tooltip/>
                <el-table-column prop="price" label="订单价格" show-overflow-tooltip/>
                <el-table-column prop="shoppingAddress" label="发货地址" show-overflow-tooltip/>
                <el-table-column prop="endAddress" label="收货地址" show-overflow-tooltip/>
                <el-table-column prop="category" label="商品类别" show-overflow-tooltip/>
                <el-table-column prop="state" label="订单状态" show-overflow-tooltip/>
                <el-table-column prop="operation" label="操作">
                    <template #default="scope">
                        <el-button type="success" @click="edit(scope)" :icon="Check" circle size="small"/>
                        <el-button type="danger" :icon="Delete" circle size="small"/>
                        </template>
                </el-table-column>

            </el-table>
            <div class="example-pagination-block">
                <el-pagination  align='center' 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange"
                    :current-page="currentPage" 
                    :page-size="pageSize" 
                    layout="total, prev, pager, next, jumper" 
                    :total="tableData.length"
                    >
                </el-pagination>
            </div>
        </el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { ref ,reactive} from 'vue'
import baseApi from '../../../api/baseApi'
import { dayjs } from 'element-plus'

const formInline = reactive({
    orderNumber: '',
    state: '',
    completionTime: '',
    category:''
})
const time = (date) =>{
      var date = new Date(date);
      var y = date.getFullYear();
	  var m = date.getMonth() + 1;
	  m = m < 10 ? ('0' + m) : m;
	  var d = date.getDate();
 	  d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
	  var minute = date.getMinutes();
	  minute = minute < 10 ? ('0' + minute) : minute;
	  let time = y + '-' + m + '-' + d+' ';
      return time
}
const onSubmit = () => {
    // var date = time(new Date(formInline.completionTime));
    // 格式化选择的时间
    var date = time(formInline.completionTime)
    formInline.completionTime = date
    console.log(formInline.completionTime);
    // 根据条件筛选数组值
    let arr = []
    // 筛选时间判断是否为空 并处理时间
    if(formInline.completionTime == "NaN-NaN-NaN "){
        formInline.completionTime = ""
    }
    // 如果状态为空则
    if(typeof formInline.state === 'undefined' || formInline.state === null|| formInline.state === ''){
        formInline.state=''
    }
    baseApi.post('/Order/queryShoppingOrder',formInline)
    .then(res => {
        res.data.data.forEach(item => {
        item.data = dayjs(item.data).format('YYYY-MM-DD HH:mm:ss')
        item.completionTime = dayjs(item.completionTime).format('YYYY-MM-DD HH:mm:ss')
        // item.state = item.state == 0 ? '未完成' : '已完成'
        switch (item.state) {
            case 0:
                item.state = '未完成';
                break;
            case 1:
                item.state = '未支付';
                break;
            case 2:
                item.state = '运输中';
                break;
            case 3:
                item.state = '未评价';
                break;
            case 4:
                item.state = '已完成';
                break;
            default:
                item.state = '未知状态';
            }
    })
  backup.push(res.data.data)
  console.log(backup);
  tableData.value = res.data.data
  console.log(res);
    }).catch(err =>{
        ElMessage.error('获取接口失败，请刷新页面！')
        console.log(err);
    })
  console.log('submit!')
}
const onSubmitDelete = () => {
    formInline.orderNumber = ''
    formInline.state = ''
    formInline.completionTime = ''
    formInline.category = ''
}
function pickerChangeFn(value){ // 日期选择器改变事件 ~ 解决日期选择器清空 值不清空的问题
    if(value===null){
        formInline.completionTime= ''
    }
}
const checked1 = ref(false)
const checked2 = ref(false)
const input = ref('')
let currentPage = ref(1)  // 当前页码
let total = 20 // 总条数
let pageSize = 10 // 每页的数据条数
const componentKey = ref(0)
const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
const tableData = ref([])
const backup = []

baseApi.get('/Order/shoppingOrder')
.then(res => {
  res.data.data.forEach(item => {
    item.data = dayjs(item.data).format('YYYY-MM-DD HH:mm:ss')
    item.completionTime = dayjs(item.completionTime).format('YYYY-MM-DD HH:mm:ss')
    // item.state = item.state == 0 ? '未完成' : '已完成'
    switch (item.state) {
        case 0:
            item.state = '未完成';
            break;
        case 1:
            item.state = '未支付';
            break;
        case 2:
            item.state = '运输中';
            break;
        case 3:
            item.state = '未评价';
            break;
        case 4:
            item.state = '已完成';
            break;
        default:
            item.state = '未知状态';
        }
  })
  backup.push(res.data.data)
  console.log(backup);
  
  tableData.value = res.data.data
  console.log(res);
}).catch(err =>{
    ElMessage.error('获取接口失败，请刷新页面！')
  console.log(err);
})


function edit(prop){
    console.log(prop)

}
 //每页条数改变时触发 选择一页显示多少行
    function handleSizeChange(val) {
         console.log(`每页 ${val} 条`);
         currentPage = ref(1);
         pageSize = val;
     }
     //当前页改变时触发 跳转其他页
     function handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        currentPage = val
        componentKey.value += 1
     }

     
</script>

<style lang="less" scoped>
.orderContainer {
    height: 100%;
    background-color: #F4F6F8;

    padding: 30px;
    .header{
        height:auto !important;
        background-color: #fff;
        position: relative;
        padding: 0;

        .checkbox{
            position: relative;
            display: flex;
            justify-content: flex-start;
            padding: 0 20px;
            height: 100%;
            align-items: center;
            .checked{
                margin-right: 20px;
                margin-left: 20px;
            }
        }
    }
    .el-main{
        padding: 0;
        margin-top: 10px;
    }
}
:deep(.el-collapse-item__header ){
    width: auto;
    // background-color: aqua;
    border: none; 
}
:deep(.el-collapse-item__header:focus ){
    outline:0;
}
:deep(.el-collapse-item__header:hover ){
    outline:0;
}
.el-form-item{
    margin-top: 10px;
    margin-bottom: 10px;
}
:deep(.el-form-item__content) {
    min-width: 150px;
}
</style>