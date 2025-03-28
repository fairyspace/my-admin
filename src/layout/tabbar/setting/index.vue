<script setup lang="ts">
  import useLayoutSettingStore from '@/store/modules/setting.ts'
  import { ref } from 'vue'

  import useUserStore from '@/store/modules/user.ts'

  import { useRouter, useRoute } from 'vue-router'

  let userStore = useUserStore()

  let layoutSettingStore = useLayoutSettingStore()

  let $router = useRouter()
  let $route = useRoute()

  let dark = ref<boolean>(false)

  const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
  }

  const fullScreen = () => {
    let full = document.fullscreenElement
    if (!full) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const loginout = async () => {
    //第一件请求后台销毁这个token
    //第二件事是前端清空用户数据
    //第三件事是返回登陆界面
    let result = await userStore.userLogout()
    //设置返回的路径是/login?redirect=$route.path
    $router.push({ path: '/login', query: { redirect: $route.path } })
  }

  const color = ref<string>('rgba(255, 69, 0, 0.68)')
  const predefineColors = ref<string[]>([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577'
  ])

  let change = () => {
    let html = document.documentElement
    dark.value ? (html.className = 'dark') : (html.className = '')
  }

  let setColor = () => {
    let html = document.documentElement
    html.style.setProperty('--el-color-primary', color.value)
  }
</script>

<template>
  <el-button size="large" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button size="large" icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" trigger="hover" width="20em">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          @change="setColor"
          :teleported="false"
          show-alpha
          :predefine="predefineColors"
        ></el-color-picker>
      </el-form-item>

      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          @change="change"
          class="ml-2"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
        ></el-switch>
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="large" icon="Setting" circle></el-button>
    </template>
  </el-popover>

  <img
    :src="userStore.avatar"
    style="width: 1.2em; height: 1.2em; margin: 0 0.3em; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down></arrow-down>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="loginout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
