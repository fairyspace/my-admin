<script setup lang="ts">
  import * as echarts from 'echarts'
  import { onMounted, ref } from 'vue'

  let charts = ref()

  onMounted(() => {
    let mycharts = echarts.init(charts.value)

    mycharts.setOption({
      title: {
        text: '游客消费统计',
        textStyle: {
          color: 'white'
        }
      },
      radar: {
        indicator: [
          { name: 'Sales', max: 1000 },
          { name: 'Admin', max: 1000 },
          { name: 'Info', max: 1000 },
          { name: 'Custom', max: 1000 },
          { name: 'Develop', max: 1000 },
          { name: 'Market', max: 1000 }
        ]
      },
      series: [
        {
          name: 'Budget',
          type: 'radar',
          data: [
            {
              value: [400, 500, 600, 800, 200, 100],
              name: 'Allocated Budget'
            },
            {
              value: [300, 344, 324, 678, 123, 230],
              name: 'Actual Budget'
            }
          ]
        }
      ]
    })
  })
</script>

<template>
  <div class="box">
    <div class="title">
      <p>数据统计</p>
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
