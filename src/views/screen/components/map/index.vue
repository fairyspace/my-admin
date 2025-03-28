<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  import chinaJson from './china.json'

  let map = ref()
  echarts.registerMap('china', chinaJson as any)

  onMounted(() => {
    let mycharts = echarts.init(map.value)
    mycharts.setOption({
      geo: [
        {
          map: 'china',
          roam: true,
          label: {
            show: true
          },
          itemStyle: {
            color: '#4169E1'
          }
        }
      ],
      series: {
        type: 'lines',
        data: [
          {
            coords: [
              [121.533918, 22.022076],
              [124.542782, 25.903886]
            ],
            lineStyle: {
              color: 'yellow',
              width: 5
            }
          }
        ],
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'red',
          symbolSize: 10
        }
      }
    })
  })
</script>

<template>
  <div class="box4" ref="map"> </div>
</template>

<style scoped lang="scss"></style>
