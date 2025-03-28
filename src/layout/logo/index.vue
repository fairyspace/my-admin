<script setup lang="ts">
  import setting from '@/setting.ts'
  import useLayoutSettingStore from '@/store/modules/setting.ts'
  let layoutSettingStore = useLayoutSettingStore()
</script>

<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" />
    <p v-if="!layoutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
  .logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 1em;

    img {
      width: 2em;
      height: 2em;
    }
    p {
      font-size: $base-logo-title-fontSize;
      margin-left: 10px;
    }
  }
</style>
