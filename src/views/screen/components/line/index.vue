<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let charts = ref()

onMounted(() => {
  let mycharts= echarts.init(charts.value)
  mycharts.setOption({
    title:{
      text:'访问量'
    },
    xAxis:{
      type:'category',
      boundaryGap:false,
      splitLine:{
        show: false
      },
      data:['周一','周二','周三','周四','周五','周六','周日'],
      axisLine:{
        show: true
      },
      axisTick:{
        show: true
      }
    },
    yAxis:{
      splitLine:{
        show: false
      },
      axisLine:{
        show: true
      },
      axisTick:{
        show: true
      }

    },
    grid:{
      left:30,
      top:30,
      right:10,
      bottom:20,
    },
    series:[
      {
        type: 'line',
        data:[50,120,110,78,87,109,134],
        smooth: true,
        areaStyle: {
          color:{
            type:'linear',
            x:0,
            y:0,
            x2:0,
            y2:1,
            colorStops:[{
              offset:0,
              color:'skyblue'
            },{
              offset:1,
              color:'orange'
            }],
            global:false
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
      <p>未来七天游客数量</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <div class="charts" ref="charts">
    </div>
  </div>
</template>

<style scoped lang="scss">
.box{
  height: 100%;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;

  .title {
    margin-left: 10px;
    p{
      color: white;
      font-size: 20px;
    }
    img {
      margin-top: 10px;
    }
  }

  .charts{
    height: calc(100% - 40px);
  }

}
</style>