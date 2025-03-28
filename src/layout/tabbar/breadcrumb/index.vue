<script setup lang="ts">
  import useLayoutSettingStore from '@/store/modules/setting.ts'
  import { useRoute } from 'vue-router'

  let layoutSettingStore = useLayoutSettingStore()

  let $route = useRoute()

  const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold
  }
</script>

<template>
  <el-icon style="margin-right: 0.2em" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!--左侧面包屑-->
  <el-breadcrumb separator-icon="ArrowRight">
    <!--    匹配路由是2个，一个是根，另一个是子路由-->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon v-if="item.meta.icon">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
