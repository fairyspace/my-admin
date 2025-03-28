<script setup lang="ts">
  import * as echarts from 'echarts'
  import { onMounted, ref } from 'vue'

  import 'echarts-liquidfill'

  let people = ref('213456人')

  let charts = ref()
  onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
      //标题组件
      //坐标轴组件
      xAxis: {},
      yAxis: {},
      //系列组件，展示图表类型
      series: {
        type: 'liquidFill',
        data: [0.6, 0.2, 0.4],
        radius: '96%' //半径,
      },
      //布局组件
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    })
  })
</script>

<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
  .box {
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 20px;
    margin-top: 10px;

    .top {
      .title {
        color: white;
        font-size: 20px;
      }

      .bg {
        width: 68px;
        height: 7px;
        background: url('../../images/dataScreen-title.png') no-repeat;
        background-size: 100% 100%;
        margin-top: 10px;
      }

      .right {
        float: right;
        color: white;
        font-size: 20px;

        span {
          color: yellow;
        }
      }
    }

    .number {
      padding: 10px;
      display: flex;
      margin-top: 30px;

      span {
        flex: 1;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-size: 100% 100%;
        background: url('../../images/total.png') no-repeat;
        color: #29fcff;
      }
    }

    .charts {
      height: 60%;
    }
  }
</style>
