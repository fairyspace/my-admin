<script setup lang="ts">
  import useLayoutSettingStore from '@/store/modules/setting.ts'
  import { nextTick, ref, watch } from 'vue'

  let LayoutSettingStore = useLayoutSettingStore()
  let flag = ref(true)
  /*监听变化，然后刷新页面*/
  watch(
    () => LayoutSettingStore.refresh,
    () => {
      flag.value = false
      /*保证销毁之后，DOM也更新完毕，再装载回来*/
      nextTick(() => {
        flag.value = true
      })
    }
  )
</script>

<template>
  <!--  注入组件实例-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
  .fade-enter-from {
    opacity: 0;
  }

  .fade-enter-active {
    transition: all 1s;
  }

  .fade-enter-to {
    opacity: 1;
  }
</style>
