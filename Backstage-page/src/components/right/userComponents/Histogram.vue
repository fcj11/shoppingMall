<template>
    <div class="histogram-box">
        <div class="box">
            <div class="dataPicker">
                <dataPicker></dataPicker>
            </div>
            <div id="chart-container"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import dataPicker from './datePicker.vue'
export default {
    components: {
        dataPicker,

  },
    setup(){

    },
    mounted(){
        var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false
});
var app = {};

var option;

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
    }
}
</script>
<style scoped>
.histogram-box{
  position: relative;
  /* width: 60%; */
  height: 70vh;
  overflow: hidden;
  background-color: var(--el-fill-color) !important;

}
.box{
    width: 98%;
    height: 98%;
    background-color: #ffffff;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 0;
}
* {
  margin: 0;
  padding: 0;
}
#chart-container {
  position: absolute;
  bottom:0;
  width: 98%;
  height: 70%;
  overflow: hidden;
  background-color: #ffffff;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
}


</style>