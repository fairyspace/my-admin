<script setup lang="ts">
import { useRouter } from 'vue-router'
import moment from 'moment'
import { ref, onMounted, onBeforeUnmount } from 'vue'
//路由驱动器
let $router = useRouter()

let goHome = () => {
  $router.push('/home')
}

let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
let timer = ref(0)

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .top {
    width: 100%;
    height: 40px;
    display: flex;
    .left {
      flex: 1;
      background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
      background-size: cover;
      .lbtn {
        width: 150px;
        height: 40px;

        background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
        background-size: 100% 100%;

        text-align: center;
        line-height: 40px;
        font-size: 20px;
        color: #29fcff;

        float: right;
      }
    }

    .center {
      flex: 2;
      .title {
        width: 100%;
        height: 74px;
        background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
        background-size: 100% 100%;
        line-height: 74px;

        color: #29fcff;
        font-size: 30px;
        text-align: center;
      }
    }

    .right {
      flex: 1;
      background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
      background-size: cover;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .rbtn {
        width: 150px;
        height: 40px;
        background: url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
        background-size: 100% 100%;

        text-align: center;
        line-height: 40px;
        color: #29fcff;
      }
      .time {
        color: #29fcff;
        margin-right: 10px;
        font-size: 18px;
      }
    }
  }
</style>
