<template>
    <div class="about-box">
        <statistic></statistic>
        <div class="box">
            <Histogram></Histogram>
            <nightingaleChart></nightingaleChart>
        </div>
       
    </div>
   
</template>

<script>
import statistic from './userComponents/statistic.vue';
import Histogram from './userComponents/Histogram.vue';
import nightingaleChart from './userComponents/nightingaleChart.vue';
export default {
    components: {
        statistic,
        Histogram,
        nightingaleChart
  },
  

}

</script>

<style scoped>
.box{
    display: grid;
    grid-auto-flow: column dense;
    grid-template-columns: 2fr 1fr;


}

</style>