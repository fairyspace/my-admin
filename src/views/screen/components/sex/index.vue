<script setup lang="ts">
  import * as echarts from 'echarts'
  import { onMounted, ref } from 'vue'

  let charts = ref()

  onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
      title: {
        text: '男女比例',
        textStyle: {
          color: 'skyblue'
        },
        left: '40%'
      },
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      grid: {
        left: '0',
        top: '0',
        right: '0',
        bottom: '0'
      },
      series: [
        {
          type: 'bar',
          data: [48],
          barWidth: 20,
          z: 100,
          itemStyle: {
            color: 'skyblue',
            borderRadius: 20
          }
        },
        {
          type: 'bar',
          data: [100],
          barWidth: 20,
          barGap: '-100%',
          itemStyle: {
            color: 'pink',
            borderRadius: 20
          }
        }
      ]
    })
  })
</script>

<template>
  <div class="box">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>

    <div class="line">
      <div class="sex">
        <div class="man">
          <img src="../../images/man.png" alt="" />
        </div>
        <div class="woman">
          <img src="../../images/woman.png" alt="" />
        </div>
      </div>
      <div class="rate">
        <p>男士48%</p>
        <p>女士52%</p>
      </div>

      <div class="charts" ref="charts"> </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .box {
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 20px;
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

    .line {
      margin: 60px 60px;
      .sex {
        display: flex;
        justify-content: space-around;

        .man {
          width: 111px;
          height: 116px;
          background: url('../../images/man-bg.png') no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .woman {
          width: 111px;
          height: 115px;
          background: url('../../images/woman-bg.png') no-repeat;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .rate {
        display: flex;
        justify-content: space-between;
        color: white;
        font-size: 20px;
      }

      .charts {
        height: 100px;
      }
    }
  }
</style>
