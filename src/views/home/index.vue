<script setup lang="ts">
  import { getTime } from '../../utils/times.ts'
  import useUserStore from '@/store/modules/user.ts'

  let userStore = useUserStore()
</script>

<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" class="avatar" />
        <div class="info">
          <h3 class="title">{{ getTime() }}好，{{ userStore.username }}</h3>
          <p class="sub_title">后台管理系统</p>
        </div>
      </div>
    </el-card>

    <div class="home_bg">
      <svg-icon name="welcome" width="29em" height="29em"></svg-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home_bg {
    display: flex;
    justify-content: center;
  }

  .box {
    display: flex;

    .avatar {
      width: 5em;
      height: 5em;
      border-radius: 50%;
    }

    .info {
      margin-left: 2em;

      .title {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 1.8em;
      }

      .sub_title {
        font-style: italic;
        color: burlywood;
      }
    }
  }
</style>
