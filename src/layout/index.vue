<script setup lang="ts">
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'

import useUserStore from '@/store/modules/user.ts'
import useLayoutSettingStore from '@/store/modules/setting.ts'

let useStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
</script>
<template>
  <div class="layout_container">
    <!--左侧菜单-->
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold }">
      <logo></logo>
      <el-scrollbar height="75vh" class="scrollbar">
        <!--菜单组件-->
        <el-menu
          background-color="#001529"
          text-color="white"
          :collapse="layoutSettingStore.fold"
          :default-active="$route.path"
        >
          <Menu :menuList="useStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航-->
    <div class="layout_tabbar" :class="{ fold: layoutSettingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <!--内容区域-->
    <div class="layout_main" :class="{ fold: layoutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
      color: white;
      width: $base-menu-width;
      height: 100vh;
      background-color: $base-menu-background;

      /*防止滚动条撑破视口*/
      .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);

        .el-menu {
          border-right: none;
        }
      }

      &.fold {
        width: $base-menu-min-width;
      }
    }

    .layout_tabbar {
      position: fixed;
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
      top: 0;
      left: $base-menu-width;
      transition: all 0.3s;
      &.fold {
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }

    .layout_main {
      position: absolute;
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      left: $base-menu-width;
      top: $base-tabbar-height;
      padding: 1em;
      overflow: auto;
      transition: all 0.3s;
      &.fold {
        width: calc(100% - $base-menu-min-width);
        left: $base-menu-min-width;
      }
    }
  }
</style>
