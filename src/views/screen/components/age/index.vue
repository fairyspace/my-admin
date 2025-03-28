<script setup lang="ts">
  import * as echarts from 'echarts'
  import { onMounted, ref } from 'vue'

  let charts = ref()
  onMounted(() => {
    let mycharts = echarts.init(charts.value)
    let option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        right: 10,
        top: 40,
        orient: 'vertical',
        textStyle: {
          color: 'white',
          fontSize: 12
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: true,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10
          },
          label: {
            show: false,
            position: 'inside'
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    }
    mycharts.setOption(option)
  })
</script>

<template>
  <div class="box">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>

    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
  .box {
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    margin-left: 20px;

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
      height: 250px;
    }
  }
</style>
