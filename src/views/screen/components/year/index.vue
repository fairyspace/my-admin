<script setup lang="ts">
  import * as echarts from 'echarts'
  import { onMounted, ref } from 'vue'

  let charts = ref()

  onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
      xAxis: {
        show: true,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      grid: {
        letf: 10,
        top: 0,
        right: 10,
        bottom: 20
      },
      series: {
        type: 'scatter',
        data: [33, 88, 21, 9, 789, 133, 1312, 123, 7868, 32, 45, 435],
        label: {
          show: true,
          position: 'top',
          color: 'cyan'
        }
      }
    })
  })
</script>

<template>
  <div class="box">
    <div class="title">
      <p>年度数据对比</p>
      <img src="../../images/dataScreen-title.png" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
  .box {
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .title {
      p {
        color: white;
        font-size: 20px;
      }

      img {
        margin-top: 10px;
      }
    }

    .charts {
      height: calc(100% - 30px);
    }
  }
</style>
