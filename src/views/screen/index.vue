<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Top from './components/top/index.vue'
  import Sex from './components/sex/index.vue'
  import Age from './components/age/index.vue'
  import Tourist from './components/tourist/index.vue'
  import Map from './components/map/index.vue'
  import Line from './components/line/index.vue'
  import Rank from './components/rank/index.vue'
  import Year from './components/year/index.vue'
  import Couter from './components/couter/index.vue'

  let screen = ref()

  onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  })

  //定义缩放比例
  function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh
    //ww<wh情况:1920/1920(ww) 1080/1080(wh)
    //ww>wh情况:1920/1920(ww) 1080/1080(wh)
  }

  window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  }
</script>

<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Couter class="couter"></Couter>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    width: 100vw;
    height: 100vh;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;

    .screen {
      width: 1920px;
      height: 1080px;

      position: fixed;
      left: 50%;
      top: 50%;
      transform-origin: top left;
      transform: scale(1) translate(-50%, -50%);

      .top {
        width: 100%;
        height: 40px;
      }
      .bottom {
        display: flex;
        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 1040px;
          margin-right: 20px;
          .rank {
            flex: 1.2;
          }
          .year {
            flex: 1;
          }
          .couter {
            flex: 1;
          }
        }
        .left {
          flex: 1;
          height: 1040px;
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          .tourist {
            flex: 1.2;
          }
          .sex {
            flex: 1;
          }
          .age {
            flex: 1;
          }
        }
        .center {
          flex: 2;
          display: flex;
          flex-direction: column;
          .map {
            flex: 2.8;
          }
          .line {
            flex: 1;
          }
        }
      }
    }
  }
</style>
