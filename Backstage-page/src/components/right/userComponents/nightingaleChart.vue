<template>
    <div class="ChartBox">
        <div class="box">
            <div id="chart-containerTwo"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    mounted(){
        var dom = document.getElementById('chart-containerTwo');
        var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
        });
var app = {};

var option;

option = {
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
    //   表示在图表中显示数据视图功能
      dataView: { show: true, readOnly: false },
    //   恢复功能
      restore: { show: true },
    //   保存为图片功能
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [30, 150],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
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
.ChartBox{
    position: relative;
  width: auto;
  height: 70vh;
  overflow: hidden;
  background-color: var(--el-fill-color) !important;

}
.box{
    width: 90%;
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
#chart-containerTwo {
  position: relative;
  width: auto;
  height: 100%;
  overflow: hidden;
}
</style>