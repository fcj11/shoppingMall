<template>

    <el-row :gutter="16" class="statistic-row" v-for="item in page" :key="item">
      <el-col :span="8"  #default="scope">
        <div class="statistic-card">
          <el-statistic :value="item.total">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                全部订单
                <el-tooltip
                  effect="dark"
                  content="Number of users who logged into the product in one day"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <!-- <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
                24%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
          </div> -->
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="item.Completed">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                已完成订单
                <el-tooltip
                  effect="dark"
                  content="Number of users who logged into the product in one month"
                  placement="top"
                >
                  <el-icon style="margin-left: 4px" :size="12">
                    <Warning />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-statistic>
          <!-- <div class="statistic-footer">
            <div class="footer-item">
              <span>month on month</span>
              <span class="red">
                12%
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </span>
            </div>
          </div> -->
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="item.imperfect" title="New transactions today">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                未完成订单
              </div>
            </template>
          </el-statistic>
          <!-- <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green">
                16%
                <el-icon>
                  <CaretTop />
                </el-icon>
              </span>
            </div>
            <div class="footer-item">
              <el-icon :size="14">
                <ArrowRight />
              </el-icon>
            </div>
          </div> -->
        </div>
      </el-col>
    </el-row>

   
</template>
  
<script lang="ts" setup>
import {
    ArrowRight,
    CaretBottom,
    CaretTop,
    Warning,
  } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {defineComponent, ref , reactive ,watch ,toRaw} from 'vue'
import baseApi from '../../../api/baseApi'
const page = ref({})
baseApi.get('/aboutpage/getPage')
.then((res) => {
    console.log(res.data.data)
    page.value = res.data.data
    console.log(page.value[0])
}).catch((err) => {
    console.log(err)
})
</script>
  
<style scoped>
  :global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
  }
  
  .statistic-row{
    padding: 10px;
    padding-bottom: 50px;
    width: 100% !important;
    background-color: var(--el-fill-color) !important;
    /* border-bottom: 1px solid #dcdfe6; */
  }
  .el-statistic {
    --el-statistic-content-font-size: 28px;
    
  }
  
  .statistic-card {
    border-radius: 10px;
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
  }
  
  .statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
    
  }
  
  .statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
  }
  
  .green {
    color: var(--el-color-success);
  }
  .red {
    color: var(--el-color-error);
  }
  </style>
  