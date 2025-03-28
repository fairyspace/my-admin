<script setup lang="ts">
  import * as echarts from 'echarts'
  import { onMounted, ref } from 'vue'
  let charts = ref()

  onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
      xAxis: {
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        boundaryGap: [0, 0.01],
        type: 'value'
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        type: 'category',
        data: ['广州', '桂林', '上海', '北京', '天津', '西安'],
        axisLabel: {
          color: 'skyblue',
          formatter: function (value: any, index: any) {
            // First column: ranking
            return ['No. ' + (index + 1), '{a|' + value + '}'].join('   ')
          },
          rich: {
            a: {
              width: 30,
              align: 'left',
              color: 'orange'
            }
          },
          margin: 15
        }
      },
      grid: {
        left: '3%',
        top: '%3',
        right: '4%',
        bottom: 0,
        containLabel: true
      },
      series: [
        {
          type: 'bar',
          data: [10, 20, 30, 40, 50, 60],
          barWidth: '30%',
          label: {
            show: true,
            position: 'right'
          },
          itemStyle: {
            borderRadius: [15, 15, 15, 15],
            color: function (data: any) {
              let arr = ['red', 'orange', 'yellowgreen', 'green', 'purple', 'hotpink', 'skyblue']
              return arr[data.dataIndex]
            }
          }
        }
      ]
    })
  })
</script>

<template>
  <div class="box">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" />
    </div>
    <div class="chart_head">
      <p>排名</p>
      <p>地点</p>
      <p>数据</p>
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
    .chart_head {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      margin: 10px 0 0 5px;

      gap: 12px;
      p {
        color: white;
      }
    }
    .charts {
      height: calc(100% - 10px);
    }
  }
</style>
